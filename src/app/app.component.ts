import { Component, ViewChild, ElementRef, OnInit, OnDestroy, HostListener } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Temperature } from '../interfaces/temperature.interface';
import { select, max, scaleLinear, line as d3Line, axisLeft, axisBottom, extent, format as d3Format } from 'd3';
import { Subscription } from 'rxjs/Subscription';
import { range } from 'lodash';
import { getDaysInYear } from 'date-fns';

const isLocal = window.location.origin.includes('localhost');

type ViewType = 'temperatures' | 'precipitations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  private readonly START_YEAR = 1881;
  private readonly END_YEAR = 2006;
  @ViewChild('svg') svg: ElementRef;
  currentView: ViewType = 'temperatures';
  range = {
    start: 1881,
    end: 2006
  };
  startOptions: Array<number>;
  endOptions: Array<number>;
  temperatures: Array<Temperature>;
  precipitations: Array<Temperature>;
  private _worker: Worker;
  private _temSubscription: Subscription;
  private _preSubscription: Subscription;
  private _cachedData: any;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this._worker = new Worker(`${isLocal ? '' : '/tinkoff'}/assets/worker.js`);
    this._worker.onmessage = ({ data }) => {
      const { chunks } = data;
      this.renderChart(chunks);
    }
    this._temSubscription = this.http.get('./assets/temperature.json').subscribe((temperatures: Array<Temperature>) => {
      this.temperatures = temperatures;
      this.updateChart();
    })
    this._preSubscription = this.http.get('./assets/precipitation.json').subscribe((precipitations: Array<Temperature>) => {
      this.precipitations = precipitations;
    })
    this.updateOptions();
  }



  ngOnDestroy() {
    this._worker.terminate();
    this._preSubscription.unsubscribe();
    this._temSubscription.unsubscribe();
  }

  changeView(view: ViewType) {
    this.currentView = view;
    this.updateChart();
  }

  changeRange(event, field) {
    const { value } = event.target;
    const selectedYear = Number(value);
    this.range[field] = selectedYear;
    this.updateChart();
    this.updateOptions();
  }

  updateChart() {
    const offsetLeft = this.getOffset(this.START_YEAR, this.range.start);
    const offsetRight = (this[this.currentView].length - 1) - this.getOffset(this.range.end, this.END_YEAR);
    const data = this[this.currentView].slice(offsetLeft, offsetRight);
    this._worker.postMessage({ data });
  }

  getOffset(start, end) {
    return range(start, end).reduce((acc, year) => {
      acc += getDaysInYear(new Date(year, 1, 1));
      return acc;
    }, 0);
  }

  updateOptions() {
    const { start, end } = this.range;
    this.startOptions = range(this.START_YEAR, end + 1);
    this.endOptions = range(start, this.END_YEAR + 1);
  }

  isActiveView(view: ViewType) {
    return this.currentView === view;
  }

  @HostListener('window:resize')
  renderChart(data = this._cachedData) {
    const { clientHeight: height, clientWidth: width } = this.svg.nativeElement;
    this._cachedData = data;
    const margin = {
      top: 25,
      bottom: 25,
      left: 50,
      right: 50
    }
    const minMax = extent(data) as Array<number>;
    const yScale = scaleLinear()
      .domain(minMax)
      .range([height - margin.bottom, margin.top]);
    const yAxis = axisLeft(yScale)
      .ticks(6)
      .tickSizeInner(-width + margin.right + margin.left);
    const $svg = select(this.svg.nativeElement);
    const format = d3Format('.3n');
    const xScale = scaleLinear()
      .domain([0, data.length - 1])
      .rangeRound([margin.left, width - margin.right]);

    const line = d3Line<number>()
      .x((data, index) => xScale(index))
      .y(yScale);
    const d = line(data);

    const $axis = $svg
      .select('.y-axis')
      .call(yAxis);

    $axis.selectAll('line')
      .attr('stroke', '#f3f3f3')
      .attr('stroke-dasharray', '5 5');

    $axis.selectAll('text')
      .attr('text-anchor', 'middle')
      .attr('x', -25)
      .attr('fill', '#676767');

    $axis
      .select('.domain')
      .remove();

    $svg
      .select('#line')
      .transition()
      .attr('d', d);


    const labels = $svg
      .select('.labels')
      .selectAll('text')
      .data(data)
      .enter()
      .append('text')

    $svg
      .select('.labels')
      .selectAll('text')
      .text(format)
      .attr('x', (data, index) => xScale(index))
      .attr('y', yScale)
      .attr('text-anchor', 'middle')
      .attr('dy', -15)
      .attr('font-size', '10px')
      .attr('font-family', 'Helvetica');

  }

}
