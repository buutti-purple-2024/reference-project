import { useEffect, useState } from "react";
import "./profileUpdate.scss";

interface userProfile {
  profileText: string,
  profileImage: string
}

const ProfileUpdate = () => {
  const [users, setUsers] = useState(null); 
  const [userId, setUserId] = useState(null);
  const [userProfileText, setUserProfileText] = useState(null);
  const [userFile, setUserFile] = useState(null);

  useEffect(() => {
    getUsers()
  }, [])

  const getUsers = async () => {
    const response = await fetch("http://localhost:3001/users/")
    const data = await response.json()
    setUsers(data);
  }

  const handleUserUpdate = (e, id: string) => {
    e.preventDefault()
    let formdata = new FormData()
    userProfileText ? formdata.append("profileText", userProfileText) : null
    userFile ? formdata.append("file", userFile): null;

    fetch(`http://localhost:3001/users/${Number(userId)}`, {
      method: 'PUT',
      body: formdata,
    }) 
  }
/*
  const getUserProfileImage = async (id: string) => {
    console.log(id)
    const response = await fetch(`http://localhost:3001/images/${id}`)
    const imageBlob = await response.blob()
    const imageObjectURL = URL.createObjectURL(imageBlob);
    setImages(imageObjectURL);
    return imageObjectURL
  }
*/
  const mapUsers = () => {
    if (users != null) {
      return(
      users.map( user => {
        return (
        <div style={{display: "flex", marginBottom: "20px"}}>
          <img height={200} width={200} src={`http://localhost:3001/${user.profileImage}`} alt="" />
          <div>
            <span>Username: {user.username}</span>  
            <br />   
            <span>id: {user.id}</span>
            <br />
            <span>Profiletext: {user.profileText}</span>
          </div>
        </div>
        )
      })
      )
    }
    else {
      return null;
    }
  }

  return (
    <div>  
      <div className="div-update-user">
        <h3 style={{width: "100%"}}>Update user</h3>
        <form onSubmit={() => handleUserUpdate} action="">
          Select id: <input onChange={(e) => setUserId(e.target.value)} type="text" /> 
          <br />
          New profiletext <input onChange={(e) => setUserProfileText(e.target.value)} type="text" />
          <br /> 
          New profileImage: <input onChange={(e) => setUserFile(e.target.files[0])} type="file" />
          <button onClick={(e) => handleUserUpdate(e)} >Submit</button>
        </form>
      </div>
      <div className="div-get-user">
        <h3>List of all users</h3>
        <div className="div-mapped-users">  
          {users ? mapUsers(): null}
        </div>
      </div>
    </div>
  )
}

export default ProfileUpdate

