import { useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

/**
 * Returns a handler that scrolls to an anchor on the homepage.
 * If not on "/", navigates to "/#section" first.
 */
export function useNavigateToSection() {
  const navigate = useNavigate();
  const location = useLocation();

  const navigateToSection = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
      e.preventDefault();

      if (location.pathname === '/') {
        const element = document.querySelector(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      } else {
        navigate('/' + sectionId);
      }
    },
    [location.pathname, navigate]
  );

  return navigateToSection;
}
