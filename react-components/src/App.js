import "./App.css";
import DropdownWithSearchAndAdd from "./components/DropdownWithSearchAndAdd";
import "./components/DropdownWithSearchAndAdd.css";
import DataGrid from "./components/DataGrid";
import Card from "./components/Card";
import Image from "./components/Image";
import Button from "./components/Button";

function App() {
  const data = Array.from({ length: 100 }, (_, i) => ({
    id: i + 1,
    name: `Name ${i + 1}`,
    age: Math.floor(Math.random() * 60) + 20,
    location: `City ${i + 1}`,
  }));

  return (
    <div className="App">

      <DropdownWithSearchAndAdd />
      <p>
        This is a example component for creating select type element with search
        and add item feature...
      </p>

      <Card>
    <Image 
      src="path/to/image.jpg" 
      alt="Card Image" 
      position="top" 
      style={{ borderRadius: '8px', width: '100%' }} // Inline styles for Image
    />
    <div className="card-content">
      <h3 className="card-title">Card Title</h3>
      <p className="card-description">This is a description for the card component.</p>
    </div>
    <Button 
      text="Click Me" 
      position="bottom-right" 
      style={{ backgroundColor: 'green', color: 'white' }} // Inline styles for Button
      onClick={() => alert('Button clicked!')}
    />
  </Card>

      <DataGrid
        columns={[
          { key: "id", label: "ID", sortable: true, fixed: true },
          { key: "name", label: "Name", sortable: true },
          { key: "age", label: "Age", sortable: true },
          { key: "location", label: "Location" },
        ]}
        data={data}
        fixedHeader
        fixedColumns={0}
        sortable
        searchable
        expandable
        itemsPerPageOptions={[10, 20, 50, 100]}
      />
    </div>
  );
}

export default App;
