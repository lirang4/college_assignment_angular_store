import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Chart from 'chart.js';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  @ViewChild('chart')

  private chartContainer: ElementRef;

  margin = { top: 20, right: 20, bottom: 30, left: 40 };

  topViews: any;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.http.get('/api/mostViewed?top=5')
      .subscribe((res: any) => {
        this.topViews = res.data;
        this.createChart();
      });
  }

  private createChart(): void {
    const myChart = new Chart(document.getElementById('myChart'), {
      type: 'bar',
      data: {
        labels: this.topViews.map(view => view.viewed_phone.series),
        datasets: [{
          label: '# of Views',
          data: this.topViews.map(view => view.viewsNumber),
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
            'rgba(255,99,132,1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });
  }
}
