import { useEffect, useState } from "react";
import "./profileUpdate.scss";

interface userProfile {
  id: number,
  username: string,
  profileText: string,
  profileImage: string
}

const ProfileUpdate = () => {
  const [users, setUsers] =  useState<null | userProfile[]>(null); 
  const [userId, setUserId] = useState<null | string>(null);
  const [userProfileText, setUserProfileText] = useState<null | string>(null);
  const [userFile, setUserFile] = useState<null | Blob>(null);
  const [usersAdminOnly, setUsersAdminOnly] = useState<null | userProfile>(null);
  const [usersAuthenticatedOnly, setUsersAuthenticatedOnly] = useState<null | userProfile>(null);

  useEffect(() => {
    getUsers()
    getUsersAdminRole()
    getUsersAuthenticated()
  }, [])

  const getUsers = async () => {
    try {
      const response = await fetch("http://localhost:3001/users/", {credentials: "include"})
      const data = await response.json()
      if (data != "403") {
        setUsers(data);
        }
    } catch (error) {
      console.log(error)
    }
  }

  const getUsersAuthenticated = async () => {
    try {
      const response = await fetch("http://localhost:3001/users/authenticatedtest", {credentials: "include"})
      const data = await response.json()
      if (data != "403") {
        setUsersAuthenticatedOnly(data);
        }
    } catch (error) {
      console.log(error)
    }
  }

  const getUsersAdminRole = async () => {
    try {
      const response = await fetch("http://localhost:3001/users/admintest", {credentials: "include"})
      const data = await response.json()
      if (data != "403") {
      setUsersAdminOnly(data);
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleUserUpdate = async (e : React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    const formdata = new FormData()
    userProfileText ? formdata.append("profileText", userProfileText) : null
    userFile ? formdata.append("file", userFile): null;

    await fetch(`http://localhost:3001/users/${Number(userId)}`, {
      method: 'PUT',
      body: formdata,
    })
    getUsers(); 
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
        <div key={user.id} className="div-map-users">
          <img src={`http://localhost:3001/${user.profileImage}`} alt="" />
          <div>
            <span>Username: {user.username}</span>  
            <br />   
            <span>Id: {user.id}</span>
            <br />
            <span>Profile text: {user.profileText}</span>
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

  const mapAdminRoleUsers = () => {
    if (usersAdminOnly != null) {
      return(
      usersAdminOnly.map( user => {
        return (
        <div key={user.id} className="div-map-users">
          <img src={`http://localhost:3001/${user.profileImage}`} alt="" />
          <div>
            <span>Username: {user.username}</span>  
            <br />   
            <span>Id: {user.id}</span>
            <br />
            <span>Profile text: {user.profileText}</span>
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

  const mapAuthenticatedUsers = () => {
    //console.log(usersAuthenticatedOnly)
    if (usersAuthenticatedOnly != null) {
      return(
      usersAuthenticatedOnly.map( user => {
        return (
        <div key={user.id} className="div-map-users">
          <img src={`http://localhost:3001/${user.profileImage}`} alt="" />
          <div>
            <span>Username: {user.username}</span>  
            <br />   
            <span>Id: {user.id}</span>
            <br />
            <span>Profile text: {user.profileText}</span>
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
        <form className="form-profile-update" onSubmit={() => handleUserUpdate} action="">
          Select id:
          <input onChange={(e) => setUserId(e.target.value)} type="text" /> 
          New profiletext
          <input onChange={(e) => setUserProfileText(e.target.value)} type="text" />
          New profile image: <input onChange={(e) => {e.target.files && setUserFile(e.target.files[0])}} type="file" />
          <button onClick={(e) => handleUserUpdate(e)} >Submit</button>
        </form>
      </div>
      <div className="div-get-user">
        <h3>List of all users</h3>
        <div className="div-mapped-users">  
          {users ? mapUsers(): null}
        </div>
        <h3>List of all users | Visible for authenticated users only</h3>
        <div className="div-mapped-users">  
          {usersAuthenticatedOnly ? mapAuthenticatedUsers(): null}
        </div>
        <h3>List of all users | Visible for admins only</h3>
        <div className="div-mapped-users">  
          {usersAdminOnly ? mapAdminRoleUsers(): null}
        </div>
      </div>
    </div>
  )
}

export default ProfileUpdate

