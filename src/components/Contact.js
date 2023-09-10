const Contact = () => {

  const handleFormSubmit = (e) => {
    e.preventDefault();
    alert("your data submitted");
  }
  return (
    <div className="flex justify-center p-2-m-2">
      <form className="flex flex-col justify-center w-4/12" onSubmit={handleFormSubmit}>
        <h1 className="text-center font-bold p-2 m-2 text-3xl">Contact Us</h1>
        <input type="text" placeholder="Your Name" className="border border-black p-2 m-2" />
        <input type="Email" placeholder="your Email" className="border border-black p-2 m-2"></input>
        <textarea placeholder="Enter Your Message" className="border border-black p-2 m-2"></textarea>
        <button type="submit" className="border border-black rounded-lg bg-slate-400 p-2 m-2 ">Submit</button>
      </form>
    </div>
  );
};
export default Contact;
