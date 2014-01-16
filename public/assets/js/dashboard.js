function init() {
  var communitySelect = $('#communities').selectize({
    create: true,
    sortField: 'text'
  })[0].selectize;

  $('#chartContainer').highcharts({
      chart: {
          type: 'bar'
      },
      title: {
          text: 'Break Down of Water Sources'
      },
      subtitle: {
          text: 'Last Quarter 2013'
      },
      xAxis: {
          categories: ['Oct 13', 'Nov 13', 'Dec 13'],
          title: {
              text: null
          }
      },
      yAxis: {
          min: 0,
          title: {
              text: 'Population (millions)',
              align: 'high'
          },
          labels: {
              overflow: 'justify'
          }
      },
      tooltip: {
          valueSuffix: ' millions'
      },
      plotOptions: {
          bar: {
              dataLabels: {
                  enabled: true
              }
          }
      },
      legend: {
          layout: 'vertical',
          align: 'right',
          verticalAlign: 'top',
          x: -40,
          y: 100,
          floating: true,
          borderWidth: 1,
          backgroundColor: '#FFFFFF',
          shadow: true
      },
      credits: {
          enabled: false
      },
      series: [{
          name: 'Functional Water Sources',
          data: [107, 31, 635]
      }, {
          name: 'Broken Down Water Sources',
          data: [133, 156, 947]
      }]
  });
}