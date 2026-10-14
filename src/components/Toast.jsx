import { Check, AlertCircle } from 'lucide-react';

export default function Toast({ toasts }) {
  return (
    <div className="toasts" aria-live="polite">
      {toasts.map((t) => (
        <div key={t.id} className={`toast glass-strong ${t.tone === 'warn' ? 'warn' : ''}`}>
          {t.tone === 'warn' ? <AlertCircle size={17} /> : <Check size={17} />}<span>{t.msg}</span>
        </div>
      ))}
    </div>
  );
}
