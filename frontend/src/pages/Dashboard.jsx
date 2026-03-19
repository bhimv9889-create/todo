import React, { useEffect, useState } from 'react'
import InputForm from '../componets/InputForm'
import CardContent from '@mui/material/CardContent'
import Card from '@mui/material/Card'
import BasicCard from '../componets/Card'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem'
import { jwtDecode } from 'jwt-decode'


export default function Dashboard({ setIsLoggedIn }) {

  const [notes, setNotes] = useState([])
  const [noteSaved, setNoteSaved] = useState(false)
  const [noteForUpdate, setNoteForUpdate] = useState(null)
  const [username, setUsername] = useState("");
  const [profile, setProfile] = useState(null);
  const [user, setUser] = useState(null)


  const getNotes = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        setIsLoggedIn(false);
        return;
      }

      const res = await fetch("http://localhost:8000/api/notes", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.status === 401) {
        localStorage.removeItem("token");
        setIsLoggedIn(false);
        return;
      }

      const data = await res.json();
      setNotes(Array.isArray(data) ? data : []);

    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  };



  useEffect(() => {
    const name = localStorage.getItem("username");
    if (name) {
      setUsername(name);
    }

    const token = localStorage.getItem("token");

    if (!token) {
      setIsLoggedIn(false);
      return;
    }

    try {
      const decoded = jwtDecode(token);
      setUser(decoded);
      getNotes();

    } catch (error) {
      console.log(`${error}:Invalid token`);
      localStorage.removeItem("token");
      localStorage.removeItem("username");
      setIsLoggedIn(false);
      return;
    }


  }, [noteSaved]);


  const pinnedNotes = notes.filter((n) => n.pinned);
  const otherNotes = notes.filter((n) => !n.pinned);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    setIsLoggedIn(false);
  };

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>

        <AppBar position="sticky" sx={{ backgroundColor: "#6d76f1", mb: 3, width: "70%", borderRadius: "8px" }} >
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Todo App
            </Typography>

            <IconButton
              size="large"
              color="inherit"
              onClick={(e) => setProfile(e.currentTarget)}
            >
              <Avatar sx={{ bgcolor: "#ffffff", color: "black" }}>
                {username ? username.charAt(0).toUpperCase() : "U"}
              </Avatar>
            </IconButton>

            <Menu
              anchorEl={profile}
              open={Boolean(profile)}
              onClose={() => setProfile(null)}
            >
              {user && [
                <MenuItem key="email" sx={{ textDecoration: "underline" }}>
                  {user.email}
                </MenuItem>
              ]}
              <MenuItem
                onClick={() => {
                  setProfile(null);
                  logout();
                }}
              >
                Logout
              </MenuItem>
            </Menu>
          </Toolbar>
        </AppBar>
      </div>

      <div className='dashboard-wrapper'>
        <div className='dashboard'>
          <Card sx={{ minWidth: 275, backgroundColor: "#f3eefb", boxShadow: "2px 2px 10px black" }}>
            <CardContent>
              <InputForm
                setNoteSaved={setNoteSaved}
                noteForUpdate={noteForUpdate}
                setNoteForUpdate={setNoteForUpdate}
              />
            </CardContent>
          </Card>
        </div>

        <div className='dashboard'>
          <Card sx={{ minWidth: 275, backgroundColor: "#f3eefb", boxShadow: "2px 2px 10px black" }}>
            <CardContent>

              <h2 className='head'>Pinned Notes</h2>
              <div className='dashboard-card'>
                {pinnedNotes.map((note) => (

                  <BasicCard
                    key={note._id}
                    title={note.title}
                    content={note.content}
                    note={note}
                    color={note.color}
                    updatedAt={note.updatedAt}
                    createdBy={note.createdBy}
                    _id={note._id}
                    refresh={getNotes}
                    setNoteForUpdate={setNoteForUpdate}
                    user={user}
                  />
                ))}
              </div>

              <h2 className='head'>Notes</h2>
              <div className='dashboard-card'>
                {otherNotes.map((note) => (
                  <BasicCard
                    key={note._id}
                    title={note.title}
                    content={note.content}
                    note={note}
                    color={note.color}
                    updatedAt={note.updatedAt}
                    createdBy={note.createdBy}
                    _id={note._id}
                    refresh={getNotes}
                    setNoteForUpdate={setNoteForUpdate}
                    user={user}
                  />
                ))}
              </div>


            </CardContent>
          </Card>
        </div>
      </div>
    </>

  )
}