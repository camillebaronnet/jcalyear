# jCalYear

Annual calendar with jQuery

Online Demo : http://camillebaronnet.github.io/jcalyear/demo/

## How to use

Start by creating an HTML container

```html
<div id="calendar"></div>
```
And load the calendar as follows

```javascript
$('#calendar').yearCalendar();
```

## Available options

| Option name | Values             | Default                       | Description                      |
| ----------- |:------------------:|:-----------------------------:| --------------------------------:|
| year        | (int)              | Current year                  | Set year for calendar display    |
| startMonth  | (int) between 1-12 | 1                             | Start month for calendar display |
| endMonth    | (int) between 1-12 | 1                             | Start month for calendar display |
| monthLabel  | (Array)            | [ "Janvier", ... ]            | Label for calendar header        |
| dayLabel    | (Array)            | [ "Dimanche", "Lundi", ... ]  | Label for calendar days          |