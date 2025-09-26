import { useState } from 'react';
import DatePicker, { registerLocale } from 'react-datepicker';
import { enGB } from 'date-fns/locale';
import { toast } from 'react-hot-toast';
import 'react-datepicker/dist/react-datepicker.css';
import css from './BookingForm.module.css';

export const BookingForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    date: '',
    comment: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    toast.success('Booking successful!', {
      icon: '🚗',
      duration: 3000,
    });

    setFormData({
      name: '',
      email: '',
      date: '',
      comment: '',
    });
  };

  registerLocale('en-GB', enGB);

  return (
    <form className={css.form} onSubmit={handleSubmit}>
      <div className={css.titleWrap}>
        <h2 className={css.title}>Book your car now</h2>
        <p className={css.subtitle}>
          Stay connected! We are always ready to help you.
        </p>
      </div>

      <div className={css.inputWrap}>
        <label className={css.label}>
          <input
            type="text"
            name="name"
            autoComplete="off"
            placeholder="Name*"
            value={formData.name}
            onChange={handleChange}
            required
            className={css.input}
          />
        </label>

        <label className={css.label}>
          <input
            type="email"
            name="email"
            autoComplete="off"
            placeholder="Email*"
            value={formData.email}
            onChange={handleChange}
            required
            className={css.input}
          />
        </label>

        <label className={css.label}>
          <DatePicker
            name="date"
            autoComplete="off"
            selected={formData.date ? new Date(formData.date) : null}
            onChange={date =>
              setFormData(prev => ({
                ...prev,
                date: date ? new Intl.DateTimeFormat('en-CA').format(date) : '',
              }))
            }
            minDate={new Date()}
            placeholderText="Booking date"
            dateFormat="dd.MM.yyyy"
            locale="en-GB"
            formatWeekDay={nameOfDay => nameOfDay.substr(0, 3).toUpperCase()}
            className={css.input}
          />
        </label>

        <label className={css.label}>
          <textarea
            name="comment"
            placeholder="Comment"
            value={formData.comment}
            onChange={handleChange}
            rows={1}
            className={css.textarea}
          />
        </label>
      </div>
      <button type="submit" className={css.button}>
        Send
      </button>
    </form>
  );
};
