import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExternalLinkAlt, faPencilAlt } from '@fortawesome/free-solid-svg-icons';

import style from './css/editablelabel.css';

const EditableLabel = props => {
  const [view, setView] = useState('label');
  const [value, setValue] = useState(props.initialValue);
  const [previous, setPrevious] = useState(props.initialValue);
  useEffect(() => {
    if (view === 'text') {
      textInput.current.focus();
    }
  }, [view, textInput]);
  useEffect(() => {
    setValue(props.initialValue || '-');
  }, [props.initialValue]);
  const textInput = useRef(null);
  const keyUp = e => {
    if (props.disableKeys === true) {
      return;
    }

    if (e.key === 'Escape') {
      setValue(previous || '-');
      setView('label');
    } else if (e.key === 'Enter') {
      setValue(e.target.value || '-');
      setPrevious(e.target.value || '-');
      setView('label');

      props.save(e.target.value);
    }
  };

  const renderLabel = () => {
    if (props.isWebsite)
      return (
        <a
          href={'#'}
          onClick={e => {
            e.preventDefault();
            setView('text');
          }}
        >
          {value}
        </a>
      );
    else
      return (
        <span
          className={props.labelClass || ''}
          onClick={() => {
            setView('text');
          }}
        >
          {value}
        </span>
      );
  };

  const renderInput = () => {
    return (
      <div>
        <input
          type={props.inputType}
          value={value}
          ref={textInput}
          className={props.inputClass || ''}
          onChange={e => {
            setValue(e.target.value);
          }}
          onBlur={e => {
            console.log(view)
            setView('label');
            setPrevious(e.target.value);
            props.save(e.target.value);
          }}
          onKeyUp={keyUp}
        />
      </div>
    );
  };
  return (
    <div>
      <h5>
        {props.heading}
        {props.isEditIcon?<span
          className={style.editicon}
          onClick={() => {
            if(view === 'label'){ 
              setView('text')
            }
            
          }}
        >
          {<FontAwesomeIcon icon={faPencilAlt} size="1x" className="fs-10" />}
        </span>:null}
        {props.isWebsite === true ? (
          <span className={style.webicon}>
            <a href={{ value }}>
              {
                <FontAwesomeIcon
                  icon={faExternalLinkAlt}
                  size="1x"
                  className={style.fs10}
                />
              }
            </a>
          </span>
        ) : null}

        <div className={style.pt6}>
          <h6>{view === 'label' ? renderLabel() : renderInput()}</h6>
        </div>
      </h5>
    </div>
  );
};

export default EditableLabel;

EditableLabel.propTypes = {
  initialValue: PropTypes.string.isRequired,
  save: PropTypes.func.isRequired,
  labelClass: PropTypes.string,
  inputClass: PropTypes.string,
  inputType: PropTypes.string,
  disableKeys: PropTypes.bool,
  heading: PropTypes.string,
  isWebsite: PropTypes.bool,
  isEditIcon:PropTypes.bool,
};
EditableLabel.defaultProps = {
  inputType: 'text',
  disableKeys: false,
  heading: '',
  isWebsite: false,
  isEditIcon:true,
}