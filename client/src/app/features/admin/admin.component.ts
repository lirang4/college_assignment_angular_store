import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as d3 from 'd3';

export interface DataType { viewsNumber: number; }

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  colors: Array<string>;
  data: any;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.colors = ['#66c2a5', '#fc8d62', '#8da0cb', '#e78ac3', '#a6d854'];

    this.http.get('/api/mostViewed?top=5')
      .subscribe((res: any) => {
        this.data = res.data;
        this.createChart(res.data);
      });
  }

  private createChart(data): void {
    const width = 400;
    const height = 400;
    const radius = Math.min(width, height) / 2 - 5;

    const svg = d3.select('#chart-area')
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', `translate(${width / 2}, ${height / 2})`);

    const pie = d3.pie<DataType>()
      .value(d => d.viewsNumber)
      .sort(null);

    const arc: any = d3.arc()
      .innerRadius(0)
      .outerRadius(radius);

    const labelArc = d3.arc()
      .outerRadius(radius - 40)
      .innerRadius(radius - 40);

    const tooltip = d3.select('#chart') // select element in the DOM with id 'chart'
      .append('div') // append a div element to the element we've selected
      .attr('class', 'tooltip'); // add class 'tooltip' on the divs we just selected

    tooltip.append('div') // add divs to the tooltip defined above
      .attr('class', 'label'); // add class 'label' on the selection

    tooltip.append('div') // add divs to the tooltip defined above
      .attr('class', 'count'); // add class 'count' on the selection

    tooltip.append('div') // add divs to the tooltip defined above
      .attr('class', 'percent'); // add class 'percent' on the selection

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
