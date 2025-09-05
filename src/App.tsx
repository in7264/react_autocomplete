import React, { useMemo, useState } from 'react';
import './App.scss';
import { peopleFromServer } from './data/people';
import { DropdownItem } from './components/DropdownItem/DropdownItem';
import debounce from 'lodash.debounce';
import { Person } from './types/Person';

export const App: React.FC = () => {
  const [dropdownInput, setDropdownInput] = useState('');
  const [currentPerson, setCurrentPerson] = useState<Person | null>(null);

  const filteredPeople = useMemo(
    () =>
      peopleFromServer.filter(person =>
        person.name.toLowerCase().includes(dropdownInput.toLowerCase()),
      ),
    [dropdownInput],
  );

  const [inputValue, setInputValue] = useState('');

  const debouncedSetInput = useMemo(
    () =>
      debounce((value: string) => {
        setDropdownInput(value);
      }, 300),
    [],
  );

  const showNoSuggestions = dropdownInput && filteredPeople.length === 0;

  return (
    <div className="container">
      <main className="section is-flex is-flex-direction-column">
        <h1 className="title" data-cy="title">
          {currentPerson
            ? `${currentPerson.name} (${currentPerson.born} - ${currentPerson.died})`
            : 'No selected person'}
        </h1>

        <div className="dropdown is-active">
          <div className="dropdown-trigger">
            <input
              type="text"
              placeholder="Enter a part of the name"
              className="input"
              data-cy="search-input"
              value={inputValue}
              onChange={event => {
                setInputValue(event.target.value);
                setCurrentPerson(null);
                debouncedSetInput(event.target.value);
              }}
            />
          </div>

          <DropdownItem
            peopleFromServer={filteredPeople}
            setDropdownInput={setDropdownInput}
            setCurrentPerson={setCurrentPerson}
          />
        </div>

        {showNoSuggestions && (
          <div
            className="notification is-danger is-light mt-3"
            role="alert"
            data-cy="no-suggestions-message"
          >
            <p className="has-text-danger">No matching suggestions</p>
          </div>
        )}
      </main>
    </div>
  );
};
