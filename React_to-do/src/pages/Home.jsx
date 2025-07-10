import NavBar from "../component/NavBar"
import React, { useState } from 'react';
import styled from 'styled-components';
import { FaCheck, FaEdit, FaTimes } from 'react-icons/fa';

export default function Home() {
      const [filter, setFilter] = useState('all');

  const todos = [
    {
      task: 'Learn React',
      description: 'Managing State, Escape Hatches, Effects',
      category: 'Programming',
      when: '-',
      priority: 'High',
      fulfillment: '30%',
      completed: false,
    },
    {
      task: 'Shopping',
      description: 'Potatoes, Onions, Eggs, Olive Oil',
      category: 'Household',
      when: '26.02.2023',
      priority: 'High',
      fulfillment: '0%',
      completed: false,
    },
    {
      task: 'Buy the tickets',
      description: 'at cheaptickets.com/shanghai',
      category: 'Travel',
      when: '12.01.2023\n12:00',
      priority: 'Medium',
      fulfillment: '100%',
      completed: true,
    },
  ];

  const filteredTodos = todos.filter((todo) => {
    if (filter === 'todo') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });
    return (
        <>
         <h1> <img
            src=".../../public/wild crowned logo.png"
            alt="Logo"
            style={{ width: '50px', height: '35px', }}
          /><br/>To-Do List</h1>
          <br />
           <Wrapper>
      <ButtonRow>
        <nav style={navStyle}>
        <div>
            <a href="/add" style={linkStyle}>Add a new to-do</a>
        </div> 
    </nav>
        <TabButton active={filter === 'all'} onClick={() => setFilter('all')}>All</TabButton>
        <TabButton active={filter === 'todo'} onClick={() => setFilter('todo')}>To-do</TabButton>
        <TabButton active={filter === 'completed'} onClick={() => setFilter('completed')}>Completed</TabButton>
      </ButtonRow>

      <Table>
        <thead>
          <tr>
            <Th>Task</Th>
            <Th>Description</Th>
            <Th>Category</Th>
            <Th>When</Th>
            <Th>Priority</Th>
            <Th>Fulfillment</Th>
            <Th>Actions</Th>
          </tr>
        </thead>
        <tbody>
          {filteredTodos.map((todo, index) => (
            <tr key={index}>
              <Td>{todo.task}</Td>
              <Td>{todo.description}</Td>
              <Td>{todo.category}</Td>
              <Td>{todo.when}</Td>
              <Td>{todo.priority}</Td>
              <Td>{todo.fulfillment}</Td>
              <Td>
                <ActionButton><FaCheck /></ActionButton>
                <ActionButton><FaEdit /></ActionButton>
                <ActionButton><FaTimes /></ActionButton>
              </Td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Wrapper>
        </>
    )
}

const Wrapper = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border-radius: 20px;
  padding: 30px;
  color: white;
  width: 90%;
  margin: auto;
`;

const Header = styled.h1`
  text-align: center;
  font-size: 24px;
`;

const ButtonRow = styled.div`
  display: flex;
  justify-content: center;
  gap: 15px;
  margin: 20px 0;
`;

const TabButton = styled.button`
  padding: 10px 20px;
  border-radius: 12px;
  background: ${(props) => (props.active ? '#5a3b2e' : 'transparent')};
  border: ${(props) => (props.active ? 'none' : '1px solid white')};
  color: white;
  cursor: pointer;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 10px;
`;

const Th = styled.th`
  text-align: left;
  padding: 12px 10px;
`;

const Td = styled.td`
  padding: 10px;
  border-top: 1px solid rgba(255, 255, 255, 0.2);
`;

const ActionButton = styled.button`
  background: transparent;
  border: none;
  color: white;
  cursor: pointer;
  margin-left: 10px;
`;

const AddButton = styled.button`
  background-color: #5a3b2e;
  color: white;
  border: none;
  padding: 12px 40px;
  font-weight: bold;
  border-radius: 12px;
  margin-bottom: 10px;
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