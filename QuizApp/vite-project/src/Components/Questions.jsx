import { useState } from 'react';
import Accordion from 'react-bootstrap/Accordion';
import { useAccordionButton } from 'react-bootstrap/AccordionButton';
import Card from 'react-bootstrap/Card';
import Question from '../Question'; // Assuming Question is an array of objects
import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai';
import '../App.css';

function CustomToggle({ children, eventKey, active, onClick }) {
  const decoratedOnClick = useAccordionButton(eventKey, () => {
    onClick(eventKey);
  });

  return (
    <button
      type="button"
      style={{ backgroundColor: 'pink' }}
      onClick={decoratedOnClick}
      className='btn'
    >
      {active ? <AiOutlineMinus /> : <AiOutlinePlus />}
      {children}
    </button>
  );
}

function Example() {
  const [activeItems, setActiveItems] = useState(Question.map(() => false));

  const handleToggle = (index) => {
    const newActiveItems = [...activeItems];
    newActiveItems[index] = !newActiveItems[index];
    setActiveItems(newActiveItems);
  };

  return (
    <div className='wrapper'>
    <h1>Questions</h1>
      {Question.map((e, i) => (
        <Accordion className='content' key={i}>
          <Card>
            <Card.Header>
              <p>{e.question}</p>
              <CustomToggle
                eventKey={i.toString()}
                active={activeItems[i]}
                onClick={() => handleToggle(i)}
              />
            </Card.Header>
            <Accordion.Collapse eventKey={i.toString()} >
              <Card.Body>{e.answer}</Card.Body>
            </Accordion.Collapse>
          </Card>
        </Accordion>
      ))}
    </div>
  );
}

export default Example;
