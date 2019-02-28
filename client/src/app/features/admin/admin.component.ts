import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as d3 from 'd3';

export interface DataType1 { viewsNumber: number; }
export interface DataType2 { value: number; }

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  colors: Array<string>;
  data1: Array<any>;
  data2: Array<any>;

  bestBrand: string;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.colors = ['#66c2a5', '#fc8d62', '#8da0cb', '#e78ac3', '#a6d854'];

    this.http.get('/api/mostViewed?top=5')
      .subscribe((res: any) => {
        this.data1 = res.data;
        this.createChart(this.data1);
      });

    this.http.get('/api/phoneBrandQuantity')
      .subscribe((res: any) => {
        this.data2 = res.data.results.slice(0, 5);
        this.createChart2(this.data2);
      });

    this.http.get('/api/mostViewedBrand')
      .subscribe((res: any) => {
        this.bestBrand = res.data;
      });
  }

  private createChart(data): void {
    const width = 300;
    const height = 300;
    const radius = Math.min(width, height) / 2 - 5;

    const svg = d3.select('#chart-area')
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', `translate(${width / 2}, ${height / 2})`);

    const pie = d3.pie<DataType1>()
      .value(d => d.viewsNumber)
      .sort(null);

    const arc: any = d3.arc()
      .innerRadius(0)
      .outerRadius(radius);

    update(data, this.colors);

    function arcTween(a) {
      const i = d3.interpolate(this._current, a);
      this._current = i(1);
      return (t: any) => arc(i(t));
    }

    function update(graphData: any, colors: Array<string>) {
      // Join new data
      const arcs = pie(data);
      const path = svg.selectAll('path')
        .data(pie(graphData));

      // Update existing arcs
      path.transition().duration(200).attrTween('d', arcTween);

      // Enter new arcs
      path.enter().append('path')
        .attr('fill', (d, i) => colors[i])
        .attr('d', arc)
        .attr('stroke', 'white')
        .attr('stroke-width', '6px');
    }
  }

  private createChart2(data): void {
    const width = 300;
    const height = 300;
    const radius = Math.min(width, height) / 2 - 5;

    const svg = d3.select('#chart-area2')
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', `translate(${width / 2}, ${height / 2})`);

    const pie = d3.pie<DataType2>()
      .value(d => d.value)
      .sort(null);

    const arc: any = d3.arc()
      .innerRadius(0)
      .outerRadius(radius);

    update(data, this.colors);

    function arcTween(a) {
      const i = d3.interpolate(this._current, a);
      this._current = i(1);
      return (t: any) => arc(i(t));
    }

    function update(graphData: any, colors: Array<string>) {
      // Join new data
      const arcs = pie(data);
      const path = svg.selectAll('path')
        .data(pie(graphData));

      // Update existing arcs
      path.transition().duration(200).attrTween('d', arcTween);

      // Enter new arcs
      path.enter().append('path')
        .attr('fill', (d, i) => colors[i])
        .attr('d', arc)
        .attr('stroke', 'white')
        .attr('stroke-width', '6px');
    }
  }
}
