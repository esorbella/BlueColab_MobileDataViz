# Compare

UI Variables:
- input$location: Dropdown input for selecting a location.
- input$firstYear: Dropdown input for selecting the start year.
- input$firstMonth: Dropdown input for selecting the start month.
- input$dataset: Dropdown input for selecting a dataset.
- input$secondYear: Dropdown input for selecting the end year.
- input$secondMonth: Dropdown input for selecting the end month.

Server Variables:
- output$distPlot: Output for the main plot.
- output$first, output$second: Outputs for dynamic UI elements.
- output$firstGauge, output$secondGauge: Outputs for gauge charts.
- location: Translated location based on the dropdown selection.
- first_start_year, first_start_month, start_day, first_end_year, first_end_month, first_end_day: Variables for the first month's date range.
second_start_year, second_start_month, second_end_year, second_end_month, second_end_day: Variables for the second month's date range.
- data: Data retrieved based on the selected location and dataset for the first month.
- wqi: Water Quality Index for the first month.
- data_maxmin, data_avg: Data processing results for the first month.
- second_data: Data retrieved based on the selected location and dataset for the second month.
- second_wqi: Water Quality Index for the second month.
- second_data_maxmin, second_data_avg: Data processing results for the second month.
- interactive_plot: The final interactive plot to be displayed.

Data Retrieval and Processing Functions:
- fetchData: Function to retrieve data based on location, dataset, and date range.
- generateUI: Function to generate UI elements displaying monthly summaries.
- findMaxMin: Function to find daily maximum and minimum values.
- findDailyAvg: Function to find daily averages.
- singlePlot: Function to create a plot for a single month.
- doublePlot: Function to create a plot for two months.
- gaugeChart: Function to create a gauge chart for Water Quality Index.
- drawThresholdsDataAvg, drawThresholdsDataMin, drawThresholdsDataMax: Functions to determine if a parameter needs to be flagged based on thresholds.
