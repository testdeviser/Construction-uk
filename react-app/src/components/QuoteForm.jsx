/* =========================================================
   Custom 3-step quote form (used in the Hero and the Final CTA).
   Front-end only: connect `submitEnquiry` to a backend / email service later.
   ========================================================= */
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { services } from '../data/site';
import { ArrowLeft, ArrowRight, Ico } from './Icons';
import { cx } from './common';
import { prefersReducedMotion } from '../hooks';

const STEPS = ['Service', 'Your Details', 'Project Details'];
const MAX_MSG = 500;

const rules = {
  name: (v) => (v ? '' : 'Please enter your name.'),
  phone: (v) => (v.replace(/\D/g, '').length >= 7 ? '' : 'Please enter a valid phone number.'),
  email: (v) => (/^\S+@\S+\.\S+$/.test(v) ? '' : 'Please enter a valid email address.'),
};
const errorFor = (name, value) => (rules[name] ? rules[name](value.trim()) : '');

const empty = { service: '', name: '', phone: '', email: '', postcode: '', message: '' };

/* TODO: replace with a real request (fetch to your API, EmailJS, Formspree, etc.) */
async function submitEnquiry(data) {
  await new Promise((r) => setTimeout(r, prefersReducedMotion() ? 0 : 900));
  return data;
}

export default function QuoteForm({ idPrefix, title, titleAs: Title = 'h2', className, formRef, ...rest }) {
  const reduce = prefersReducedMotion();
  const [step, setStep] = useState(0);
  const [values, setValues] = useState(empty);
  const [errors, setErrors] = useState({});           // errors currently shown
  const [serviceError, setServiceError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const viewportRef = useRef(null);
  const stepRefs = useRef([]);
  const fieldRefs = useRef({});
  const doneRef = useRef(null);
  const timers = useRef([]);
  const later = (fn, ms) => timers.current.push(setTimeout(fn, ms));
  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  /* Keep the viewport height matched to the current step */
  const fit = () => {
    const s = stepRefs.current[step];
    if (s && viewportRef.current) viewportRef.current.style.height = s.offsetHeight + 28 + 'px';
  };
  useLayoutEffect(fit);
  useEffect(() => {
    window.addEventListener('resize', fit);
    document.fonts?.ready.then(fit);
    return () => window.removeEventListener('resize', fit);
  });

  const go = (i, focus = true) => {
    setStep(i);
    if (!focus) return;
    later(() => {
      const fs = stepRefs.current[i];
      if (!fs) return;
      const target = i === 0
        ? fs.querySelector('input:checked') || fs.querySelector('input')
        : fs.querySelector('input:not([type=radio]), textarea');
      target?.focus({ preventScroll: true });
    }, reduce ? 0 : 450);
  };

  /* Show/clear the error for one field. `show` = reveal a new error (blur / Continue) */
  const check = (name, value, show) => {
    const err = errorFor(name, value);
    setErrors((e) => (show || !err ? { ...e, [name]: err } : e));
    return !err;
  };

  const validateStep = (i) => {
    if (i === 0) {
      const ok = !!values.service;
      setServiceError(!ok);
      return ok;
    }
    if (i === 1) {
      let first = null;
      ['name', 'phone', 'email'].forEach((k) => { if (!check(k, values[k], true)) first = first || k; });
      if (first) fieldRefs.current[first]?.focus();
      return !first;
    }
    return true;
  };

  const next = () => { if (validateStep(step)) go(step + 1); };

  const onChange = (e) => {
    const { name, value } = e.target;
    setValues((v) => ({ ...v, [name]: value }));
    if (name === 'service') {
      setServiceError(false);
      // Picking a service moves straight on to the details step
      if (step === 0) later(() => go(1, e.nativeEvent.isTrusted), reduce ? 0 : 320);
    } else {
      check(name, value, false);
    }
  };

  const onBlur = (e) => {
    const { name, value } = e.target;
    if (value.trim()) check(name, value, true);
  };

  // Enter moves forward instead of submitting early
  const onKeyDown = (e) => {
    if (e.key === 'Enter' && e.target.tagName === 'INPUT' && step < STEPS.length - 1) {
      e.preventDefault();
      next();
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (step !== STEPS.length - 1) { next(); return; }
    if (!values.service) { go(0); setServiceError(true); return; }
    const allOk = ['name', 'phone', 'email'].map((k) => check(k, values[k], true)).every(Boolean);
    if (!allOk) { go(1); return; }
    setLoading(true);
    await submitEnquiry(values);
    setLoading(false);
    setDone(true);
  };

  useEffect(() => { if (done) doneRef.current?.focus(); }, [done]);

  const chosen = services.find((s) => s.title === values.service);
  const fieldClass = (name) => {
    const v = values[name].trim();
    return cx('field field--float', v !== '' && !errorFor(name, v) && 'is-valid', errors[name] && 'has-error');
  };

  const field = (name, type, label, autoComplete, required) => (
    <div className={fieldClass(name)}>
      <input
        ref={(el) => (fieldRefs.current[name] = el)}
        type={type} id={`${idPrefix}-${name}`} name={name} placeholder=" "
        autoComplete={autoComplete} required={required}
        value={values[name]} onChange={onChange} onBlur={onBlur}
      />
      <label htmlFor={`${idPrefix}-${name}`}>{label}</label>
      <i className="field__ok" aria-hidden="true"></i>
      <span className="field__err" aria-live="polite">{errors[name] || ''}</span>
    </div>
  );

  return (
    <form
      ref={formRef}
      className={cx(className, done && 'is-done')}
      noValidate
      onSubmit={onSubmit}
      onKeyDown={onKeyDown}
      {...rest}
    >
      <div className="form__head">
        <Title className="form__title">{title}</Title>
        <span className="form__stepno">{done ? '' : `Step ${step + 1} of ${STEPS.length}`}</span>
      </div>
      <ol className="stepper" aria-hidden="true">
        {STEPS.map((label, k) => (
          <li key={label} className={cx(!done && k === step && 'is-current', (done || k < step) && 'is-done')}>
            <b>{k + 1}</b><span>{label}</span>
          </li>
        ))}
      </ol>

      <div className="form__viewport" ref={viewportRef} hidden={done}>
        <div className="form__track" style={{ transform: `translateX(calc(${-step * 100}% - ${step * 40}px))` }}>

          {/* Step 1: service */}
          <fieldset ref={(el) => (stepRefs.current[0] = el)} className={cx('form__step', step === 0 && 'is-active', serviceError && 'has-error')} data-step="0" inert={step !== 0}>
            <legend className="sr-only">Service Required</legend>
            <p className="form__q">Service Required*</p>
            <div className="svc-picks">
              {services.map((s) => (
                <label className="svc-pick" key={s.title}>
                  <input type="radio" name="service" value={s.title} required checked={values.service === s.title} onChange={onChange} />
                  <span className="svc-pick__box">
                    <span className="svc-pick__ico"><Ico d={s.icon} /></span>
                    <b>{s.title}</b>
                    <i className="svc-pick__dot" aria-hidden="true"></i>
                  </span>
                </label>
              ))}
            </div>
            <p className="form__msg">{serviceError ? 'Please choose a service to continue.' : ''}</p>
            <div className="form__nav">
              <span></span>
              <button type="button" className="btn btn--primary" onClick={next}>Continue <ArrowRight /></button>
            </div>
          </fieldset>

          {/* Step 2: contact details */}
          <fieldset ref={(el) => (stepRefs.current[1] = el)} className={cx('form__step', step === 1 && 'is-active')} data-step="1" inert={step !== 1}>
            <legend className="sr-only">Your Details</legend>
            <div className="form__chosen">
              {chosen && <>{chosen.title} <button type="button" onClick={() => go(0)}>Change</button></>}
            </div>
            <div className="form__row">
              {field('name', 'text', 'Full Name*', 'name', true)}
              {field('phone', 'tel', 'Phone Number*', 'tel', true)}
            </div>
            <div className="form__row">
              {field('email', 'email', 'Email Address*', 'email', true)}
              {field('postcode', 'text', 'Postcode', 'postal-code', false)}
            </div>
            <p className="form__msg"></p>
            <div className="form__nav">
              <button type="button" className="btn btn--ghost" onClick={() => go(0)}><ArrowLeft /> Back</button>
              <button type="button" className="btn btn--primary" onClick={next}>Continue <ArrowRight /></button>
            </div>
          </fieldset>

          {/* Step 3: project details */}
          <fieldset ref={(el) => (stepRefs.current[2] = el)} className={cx('form__step', step === 2 && 'is-active')} data-step="2" inert={step !== 2}>
            <legend className="sr-only">Project Details</legend>
            <div className="form__summary">
              {step === 2 && chosen && (
                <>
                  <span className="svc-pick__ico"><Ico d={chosen.icon} /></span>
                  <strong>{chosen.title}</strong>
                  <small>{values.name.trim()} · {values.phone.trim()} · {values.email.trim()}</small>
                  <button type="button" onClick={() => go(1)}>Edit</button>
                </>
              )}
            </div>
            <div className="field field--float field--area">
              <textarea id={`${idPrefix}-message`} name="message" rows="5" placeholder=" " maxLength={MAX_MSG} value={values.message} onChange={onChange}></textarea>
              <label htmlFor={`${idPrefix}-message`}>Project Details</label>
              <span className="field__count"><b>{values.message.length}</b>/{MAX_MSG}</span>
            </div>
            <p className="form__msg"></p>
            <div className="form__nav">
              <button type="button" className="btn btn--ghost" onClick={() => go(1)}><ArrowLeft /> Back</button>
              <button type="submit" className={cx('btn btn--primary form__submit', loading && 'is-loading')}><span>Send Enquiry</span> <ArrowRight /></button>
            </div>
          </fieldset>

        </div>
      </div>

      <div className="form__done" hidden={!done} tabIndex={-1} ref={doneRef}>
        <span className="form__check" aria-hidden="true"><svg viewBox="0 0 52 52"><circle cx="26" cy="26" r="24" /><path d="M15 27l7.5 7.5L38 19" /></svg></span>
        <p>{done ? 'Thank you – your enquiry is ready to send. (Form submission to be connected.)' : ''}</p>
      </div>
    </form>
  );
}
