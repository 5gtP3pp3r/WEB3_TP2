import React from 'react';
import { Button } from 'react-bootstrap';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import { useNavigate } from 'react-router';

interface PageTemplateProps {
  title: string;
  children: React.ReactNode;
  previous: string;
  nextPage: string;
}

export function PageTemplate({ title, children, previous, nextPage }: PageTemplateProps) {
  const navigate = useNavigate();

  return (
    <div>
      <h3>{title}</h3>
      <div>{children}</div>
      <div className="d-flex justify-content-center mb-5">
        <ButtonGroup>
            <Button
                onClick={() => navigate(previous)}
                className="btn btn-light"
                style={{width:160}}
            >
            Jeu Précédent
            </Button>
            <Button
                onClick={() => navigate(nextPage)}
                className="btn btn-light"
                style={{width:160}}
            >
            Jeu Suivant
            </Button>        
        </ButtonGroup>
      </div>
    </div>
  );
}
