export default function Help() {
  return (
    <div className='p-4'>
      <h1 className='text-2xl font-bold mb-4'>Help</h1>
      <p className='mb-2'>Available commands:</p>
      <ul className='list-disc pl-5'>
        <li>
          <span className='text-green-400'>about</span> - Learn more about me
        </li>
        <li>
          <span className='text-green-400'>skills</span> - View my technical
          skills
        </li>
        <li>
          <span className='text-green-400'>projects</span> - See my recent work
        </li>
        <li>
          <span className='text-green-400'>contact</span> - View my contact
          information
        </li>
        <li>
          <span className='text-green-400'>help</span> - Show this help message
        </li>
      </ul>
    </div>
  );
}
