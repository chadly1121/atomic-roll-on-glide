import { useEffect, useRef } from 'react';
import { trackEventOnce, currentPath } from '@/lib/analytics';

const FORM_ID = 'jwzPHW5PZwf2p9zejUph';
const SRC = `https://link.arclightpainting.com/widget/form/${FORM_ID}`;
const SCRIPT_SRC = 'https://link.arclightpainting.com/js/form_embed.js';
const FORM_NAME = 'estimate_form';

const GhlContactForm = () => {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    if (document.querySelector(`script[src="${SCRIPT_SRC}"]`)) return;
    const s = document.createElement('script');
    s.src = SCRIPT_SRC;
    s.async = true;
    document.body.appendChild(s);
  }, []);

  // The form lives in a cross-origin iframe, so the first genuine interaction is
  // detected via focus entering the frame. Fires once per form per page view.
  useEffect(() => {
    const onBlur = () => {
      if (document.activeElement === iframeRef.current) {
        trackEventOnce(`form_start:${FORM_NAME}:${currentPath()}`, 'form_start', {
          form_name: FORM_NAME,
          page_path: currentPath(),
        });
      }
    };
    window.addEventListener('blur', onBlur);
    return () => window.removeEventListener('blur', onBlur);
  }, []);

  return (
    <iframe
      ref={iframeRef}
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
