'use client';

import type React from 'react';
import { useEffect, useState, useRef } from 'react';
import { Terminal } from 'lucide-react';

import Help from './help';

function App() {
  interface Command {
    input: string;
    output: React.ReactNode;
    timestamp: string;
  }
  const [commands, setCommands] = useState<Command[]>([]);
  const [currentInput, setCurrentInput] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const executeCommand = (input: string) => {
    const sanitisedInput = input.trim().toLowerCase();

    switch (sanitisedInput) {
      case 'help':
        setCommands((prev) => [
          ...prev,
          {
            input: input,
            output: <Help />,
            timestamp: new Date().toLocaleTimeString(),
          },
        ]);
        break;
      default:
        setCommands((prev) => [
          ...prev,
          {
            input: input,
            output: (
              <span className='text-red-500'>Command not found: {input}</span>
            ),
            timestamp: new Date().toLocaleTimeString(),
          },
        ]);
        break;
    }

    console.log(sanitisedInput);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentInput.trim()) {
      executeCommand(currentInput);
      setCurrentInput('');
    }
  };

  const focusInput = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  useEffect(() => {
    const welcomeCommand: Command = {
      input: '',
      output: (
        <span>
          Welcome to my portfolio. Type
          <code className='text-green-300'> help</code> for a list of commands.
        </span>
      ),
      timestamp: new Date().toLocaleTimeString(),
    };
    setCommands([welcomeCommand]);
  }, []);

  return (
    <div className='min-h-screen bg-black text-green-400 font-mono'>
      <div className='container mx-auto p-4 max-w-4xl'>
        <div className='bg-gray-900 rounded-lg p-4 shadow-2l border border-gray-700'>
          <div className='flex items-center justify-between bg-gray-800 px-4 py-2 rounded-t-lg border-b border-gray-700'>
            <div className='flex items-center space-x-2 text-gray-400 text-sm'>
              <Terminal className='w-4 h-4' />
              <span>Lewis Blount - Portfolio</span>
            </div>
          </div>
          <div
            className='p-4 h-[27rem] overflow-y-auto cursor-text'
            onClick={focusInput}
          >
            {commands.map((command, index) => (
              <div key={index} className='mb-2'>
                {command.input && (
                  <div className='flex items-center space-x-2 text-green-400'>
                    <span className='text-blue-400'>guest@portfolio</span>
                    <span className='text-white'>:</span>
                    <span className='text-blue-400'>~</span>
                    <span className='text-white'>$</span>
                    <span>{command.input}</span>
                  </div>
                )}
                {command.output && (
                  <div className='mt-1 mb-3'>{command.output}</div>
                )}
              </div>
            ))}
            <form
              onSubmit={handleSubmit}
              className='flex items-center space-x-2'
            >
              <span className='text-blue-400'>guest@portfolio</span>
              <span className='text-white'>:</span>
              <span className='text-blue-400'>~</span>
              <span className='text-white'>$</span>
              <input
                ref={inputRef}
                type='text'
                value={currentInput}
                onChange={(e) => setCurrentInput(e.target.value)}
                className='flex-1 bg-transparent outline-none text-green-400 caret-green-400'
                autoFocus
                spellCheck={false}
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
