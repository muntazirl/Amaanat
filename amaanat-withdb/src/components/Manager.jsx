import React from 'react'
import { useRef, useState, useEffect } from 'react'
import { ToastContainer, toast, Bounce } from 'react-toastify';
import uuid from 'react-native-uuid';



const Manager = () => {
  const ref = useRef();
  const pef = useRef();
  const site = useRef();
  const [form, setform] = useState({ site: "", username: "", password: "" });
  const [passwordArray, setpasswordArray] = useState([])
    const getPasswords = async () => {
      let req=await fetch("http://localhost:3000/");
      let pass= await req.json();
      setpasswordArray(pass)
      console.log(pass);
    }
     
    
  
  useEffect(() => {
    
  getPasswords();
    
  }, [])
  
  

  const showpassword = () => {
    if (ref.current.src.includes(

      "/public/icons/eye.png"
    )
    ) {

      ref.current.src = "/public/icons/eyecross.png";
    }
    else {
      ref.current.src = "/public/icons/eye.png";
    }
  }

  const chtypepassword = () => {
    if (ref.current.src.includes("/public/icons/eyecross.png")) {
      pef.current.type = "text";
      ref.current.src = "/public/icons/eye.png"
    }
    else {
      pef.current.type = "password";
      ref.current.src = "/public/icons/eyecross.png"

    }

  }

  const deletePassword = async (id) => {
    let c=confirm("Are you sure you want to delete this password ?")
    if(c){

      // localStorage.setItem("passwords",JSON.stringify(passwordArray.filter(item=>item.id!=id)))
      setpasswordArray(passwordArray.filter(item=>item.id!=id))
      let res=await fetch("http://localhost:3000/", {method: "DELETE",headers: {"Content-Type":"application/json"}, body: JSON.stringify({id})})
      console.log("password deleted successfully !")
      toast('Password deleted successfully', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });
    }

  }

  const editPassword = async (id) => {
    console.log("Editing : ",id)
    setform({...passwordArray.filter(i=>i.id===id)[0], id: id})
    setpasswordArray(passwordArray.filter(item=>item.id!=id))
  }
  
  

  const savePassword = async  () => {
    if(form.site.length>3 && form.username.length>3&&form.password.length>3){

      //if that id exists
      await fetch("http://localhost:3000/", {method: "DELETE",headers: {"Content-Type":"application/json"}, body: JSON.stringify({id: form.id})})

      setpasswordArray([...passwordArray, {...form, id: uuid.v4()}]);
      let res=await fetch("http://localhost:3000/", {method: "POST",headers: {"Content-Type":"application/json"}, body: JSON.stringify({...form,id:uuid.v4()})})
      // localStorage.setItem("passwords", JSON.stringify([...passwordArray, {...form, id: uuid.v4()}]));

      // console.log([...passwordArray, {...form, id: uuid.v4()}]);
      setform({ site: "", username: "", password: "" })
      toast('Password Saved !', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
    }
    else{
      toast('Error : Password not saved !', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
    }
    
  }

  const handleChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value })
  }

  const copyText = (e) => {

    navigator.clipboard.writeText(e);
    toast('Copied to Clipboard!', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });
  }


  return (

    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
      <div>


        <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"></div>
        <div className='p-10 md:px-40 md:mycontainer'>
          <h1 className='font-bold text-3xl text-center'>
            <span className='text-green-600'>&lt;</span>
            <span className=''>Amaanat</span>
            {/* <span className=''>OP</span> */}
            <span className='text-green-600'>/&gt;</span>
          </h1>
          <p className='text-center text-green-600'>Your own password manager</p>
          <div className=' flex flex-col p-4 gap-8 items-center'>
            <div className="maininput w-full">

              <input type="text" value={form.site} ref={site} placeholder='Enter website URL' onChange={handleChange} name='site' className='rounded-full px-4 bg-white border border-green-400 w-full' />
            </div>
            <div className="flex flex-col md:flex-row w-full justify-between gap-8">
              <input type="text" placeholder='Enter username' onChange={handleChange} name='username' value={form.username} className='rounded-full px-4 bg-white border border-green-400 w-full' />
              <div className="relative w-full">

                <div><input type="password" placeholder='Enter password' ref={pef} onChange={handleChange} name='password' value={form.password} className='rounded-full px-4 bg-white border border-green-400 w-full' /></div>

                <span className='absolute right-2 top-0'><img src="/public/icons/eyecross.png" ref={ref} className='cursor-pointer' onClick={chtypepassword} width={25} alt="" />
                </span>
              </div>
            </div>
            <button onClick={savePassword} className='flex gap-2  justify-center items-center rounded-full bg-green-500 cursor-pointer hover:bg-green-300 w-fit px-4 border border-green-950 py-2'><lord-icon
              src="https://cdn.lordicon.com/vjgknpfx.json"
              trigger="hover" >
            </lord-icon>Save Password
            </button>

          </div>
          <div className="allpasswords">
            <h2 className='text-center text-2xl text-green-700 font-bold mt-10'>Your Passwords</h2>
            {passwordArray.length === 0 && <div>No passwords to show</div>}
            {passwordArray.length != 0 &&

              <table className="table-auto w-full overflow-hidden rounded-2xl">
                <thead className='bg-green-800 text-white font-bold'>
                  <tr>
                    <th className='py-2'>Site Name</th>
                    <th className='py-2'>Username</th>
                    <th className='py-2'>Password</th>
                    <th className='py-2'>Action</th>
                  </tr>
                </thead>
                <tbody className='bg-green-100'>
                  {passwordArray.map((item, index) => {
                    return <tr key={index} >
                      <td className='text-center w-32 py-2 hover:underline'>
                        <div className="andiv flex justify-center items-center">
                          <a href={item.site} target='_blank' className=''>{item.site}


                          </a>
                          <div className="cpybtn cursor-pointer" onClick={() => { copyText(item.site) }}>

                            <lord-icon
                              style={{ "width": "25px", "height": "25px", "paddingTop": "6px", "paddingLeft": "2px" }}
                              src="https://cdn.lordicon.com/iykgtsbt.json"
                              trigger="hover" >
                            </lord-icon>
                          </div>
                        </div>
                      </td>

                      <td className='text-center w-32 py-2'>
                        <div className="andiv flex justify-center items-center">

                          {item.username}
                          <div className="cpybtn cursor-pointer" onClick={() => { copyText(item.username) }}>

                            <lord-icon
                              style={{ "width": "25px", "height": "25px", "paddingTop": "6px", "paddingLeft": "2px" }}
                              src="https://cdn.lordicon.com/iykgtsbt.json"
                              trigger="hover" >
                            </lord-icon>
                          </div>
                        </div>
                      </td>
                      <td className='text-center w-32 py-2'><div className="andiv flex justify-center items-center">
                        {"•".repeat(item.password?.length||0)}
                        <div className="cpybtn cursor-pointer" onClick={() => { copyText(item.password) }}>

                          <lord-icon
                            style={{ "width": "25px", "height": "25px", "paddingTop": "6px", "paddingLeft": "2px" }}
                            src="https://cdn.lordicon.com/iykgtsbt.json"
                            trigger="hover" >
                          </lord-icon>
                        </div>
                      </div>
                      </td>
                      <td className='text-center w-32 '>
                        <span className='cursor-pointer px-2 'onClick={()=>{editPassword(item.id)}}><lord-icon
                          src="https://cdn.lordicon.com/gwlusjdu.json"
                          trigger="hover"
                          style={{ "width": "25px", "height": "25px" }}>
                        </lord-icon></span>
                        <span className='cursor-pointer px-2' onClick={()=>{deletePassword(item.id)}}>
                          <lord-icon
                            src="https://cdn.lordicon.com/skkahier.json"
                            trigger="hover"
                            style={{ "width": "25px", "height": "25px" }}>
                          </lord-icon>
                        </span>
                      </td>
                    </tr>

                  })}
                </tbody>
              </table>
            }

          </div>
        </div>
      </div>
    </>
  )
}

export default Manager
