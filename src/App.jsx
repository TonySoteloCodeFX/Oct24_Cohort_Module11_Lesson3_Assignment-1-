import { Component } from "react";
import CharacterList from "./components/CharacterList";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedCharacterID: null,
    };
  }

  handleCharacterSelect = (characterId) => {
    this.setState({ selectedCharacterID: characterId });
  };

  render() {
    const { selectedCharacterID } = this.state;

    return (
      <section className="app-container">
        <h1>Pokémon</h1>
        {selectedCharacterID !== null && <p>Selected Pokémon ID: {selectedCharacterID}</p>}
        <CharacterList onCharacterSelect={this.handleCharacterSelect} />
      </section>
    );
  }
}

export default App;
