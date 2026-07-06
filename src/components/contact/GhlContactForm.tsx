import { useEffect } from 'react';

const FORM_ID = 'jwzPHW5PZwf2p9zejUph';
const SRC = `https://link.arclightpainting.com/widget/form/${FORM_ID}`;
const SCRIPT_SRC = 'https://link.arclightpainting.com/js/form_embed.js';

const GhlContactForm = () => {
  useEffect(() => {
    if (document.querySelector(`script[src="${SCRIPT_SRC}"]`)) return;
    const s = document.createElement('script');
    s.src = SCRIPT_SRC;
    s.async = true;
    document.body.appendChild(s);
  }, []);

  return (
    <iframe
      src={SRC}
      id={`inline-${FORM_ID}`}
      title="Estimate Form"
      data-layout="{'id':'INLINE'}"
      data-trigger-type="alwaysShow"
      data-trigger-value=""
      data-activation-type="alwaysActivated"
      data-activation-value=""
      data-deactivation-type="neverDeactivate"
      data-deactivation-value=""
      data-form-name="Estimate Form"
      data-height="1288"
      data-layout-iframe-id={`inline-${FORM_ID}`}
      data-form-id={FORM_ID}
      style={{ width: '100%', minHeight: '1288px', border: 'none', borderRadius: '8px' }}
    />
  );
};

export default GhlContactForm;