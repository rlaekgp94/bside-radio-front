
import Select from './Select'

export default function DateSelect(props) {
  const { select, setSelect } = props;
  const now = new Date();

  let years = [];
  for (let y = now.getFullYear(); y >= 1930; y -= 1) {
    years.push(y);
  }

  let month = [];
  for (let m = 1; m <= 12; m += 1) {
    if (m < 10) {
      month.push("0" + m.toString());
    } else {
      month.push(m.toString());
    }
  }

  let days = [];
  let date = new Date(select.year, select.month, 0).getDate();
  for (let d = 1; d <= date; d += 1) {
    if (d < 10) {
      days.push("0" + d.toString());
    } else {
      days.push(d.toString());
    }
  }

  const yearsData = {
    list: years,
    id: 'years',
    label: 'component.modal.register.birth.year',
    state: select,
    setState: (selectedYear) => setSelect({ ...select, year: selectedYear }),
  }
  const monthData = {
    list: month,
    id: 'month',
    label: 'component.modal.register.birth.month',
    state: select,
    setState: (selectedMonth) => setSelect({ ...select, month: selectedMonth }),
  }
  const daysData = {
    list: days,
    id: 'days',
    label: 'component.modal.register.birth.day',
    state: select,
    setState: (selectedDay) => setSelect({ ...select, day: selectedDay }),
  }
  return (
    <div className="date-select-inner">
      <Select {...daysData} />
      <Select {...monthData} />
      <Select {...yearsData} />
    </div>
  )
}