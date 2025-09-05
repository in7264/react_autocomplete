import { Person } from '../../types/Person';

type Props = {
  peopleFromServer: Person[];
  setDropdownInput: (value: string) => void;
  setCurrentPerson: (value: Person) => void;
};

export const DropdownItem: React.FC<Props> = ({
  peopleFromServer,
  setDropdownInput,
  setCurrentPerson,
}) => {
  const handleClick = (person: Person) => {
    setDropdownInput(person.name);
    setCurrentPerson(person);
  };

  return (
    <div className="dropdown-menu" role="menu" data-cy="suggestions-list">
      <div className="dropdown-content">
        {peopleFromServer.map(person => (
          <div
            className="dropdown-item"
            data-cy="suggestion-item"
            key={person.name}
            onClick={() => handleClick(person)}
          >
            <p className="has-text-link">{person.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
