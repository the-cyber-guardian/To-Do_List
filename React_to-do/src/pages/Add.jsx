import styled from "styled-components"

export default function AddItems() {
    return (
        <>
           <FormWrapper>
             <nav style={navStyle}>
        <div>
            <a href="/" style={linkStyle}>Back</a>
        </div> 
    </nav>
      {/* Top row */}
      <Row>
        <InputGroup>
          <Label>name for the task you're going to do</Label>
          <Input type="text" />
        </InputGroup>
        <InputGroup>
          <Label>select from dropdown</Label>
          <Select>
            <option value="">Select</option>
            <option value="work">Work</option>
            <option value="study">Study</option>
            <option value="home">Home</option>
          </Select>
        </InputGroup>
      </Row>

      {/* Description */}
      <InputGroup>
        <Label>a short description of the task - can be omitted</Label>
        <Textarea />
      </InputGroup>

      {/* Category */}
      <InputGroup>
        <Label>e.g. household, school, work</Label>
        <Input type="text" />
      </InputGroup>

      {/* Date and Time row */}
      <Row>
        <InputGroup>
          <Label>dd/mm/yyyy - can be omitted</Label>
          <Input type="text" />
        </InputGroup>
        <InputGroup>
          <Label>hh:mm - can be omitted</Label>
          <Input type="text" />
        </InputGroup>
      </Row>

      {/* Slider */}
      <SliderWrapper>
        <Slider type="range" />
      </SliderWrapper>

      {/* Buttons */}
      <ButtonRow>
        <SaveButton>Save</SaveButton>
        <CancelButton>Cancel</CancelButton>
      </ButtonRow>
    </FormWrapper>
        </>
    )
}


const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  width: 800px;
  padding: 30px;
`;

const Row = styled.div`
  display: flex;
  gap: 20px;
  justify-content: space-between;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  flex: ${(props) => props.fullWidth ? '1' : '1'};
`;

const Label = styled.label`
  margin-bottom: 5px;
  font-size: 14px;
  color: back;
`;

const Input = styled.input`

  background-color:rgba(0, 0, 0, 0.38);
  padding: 10px;
  border-radius: 6px;
  color: #fff;
`;

const Textarea = styled.textarea`

 background-color:rgba(0, 0, 0, 0.38);
  padding: 10px;
  border-radius: 6px;
  color: #fff;
  resize: none;
  height: 80px;
`;

const Select = styled.select`
  background-color:rgba(0, 0, 0, 0.38);
  padding: 10px;
  border-radius: 6px;
  color: black;
`;

const SliderWrapper = styled.div`
  display: flex;
  align-items: center;
  padding-left: 10px;
`;

const Slider = styled.input`
  width: 100%;
  accent-color: #ccc;
`;

const ButtonRow = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 20px;
  margin-top: 20px;
`;

const SaveButton = styled.button`
  padding: 10px 30px;
  border-radius: 12px;
  border: none;
  background-color: #5a3b2e;
  color: white;
  font-weight: bold;
`;

const CancelButton = styled.button`
  padding: 10px 30px;
  border-radius: 12px;
  background-color: transparent;
  border: 1px solid white;
  color: white;
  font-weight: bold;
`;

const navStyle = {
    
    padding: '10px 20px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    color: '#fff',
};

const linkStyle = {
    color: 'white',
    textDecoration: 'none',
    margin: '0 20px',
    padding: '15px 50px',
    borderRadius: '20px',
    backgroundColor: 'rgba(4, 4, 4, 0.32)',
};