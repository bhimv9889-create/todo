import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardHeader from '@mui/material/CardHeader';
import IconButton from '@mui/material/IconButton';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import PushPinIcon from '@mui/icons-material/PushPin';
import { formatDate } from '../utils/utils';
import Tooltip from '@mui/material/Tooltip';

export default function BasicCard({ title = "Title", content = "Content", color, updatedAt, _id, refresh, setNoteForUpdate, note, user }) {



  const deleteNote = async () => {
    const token = localStorage.getItem("token");
    const res = await fetch(`http://https://todo-production-47f2.up.railway.app/api/notes/${_id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },

    });
    if (res.ok && refresh) refresh();

  }
  const pinTask = async () => {
    const token = localStorage.getItem("token");
    await fetch(`http://https://todo-production-47f2.up.railway.app/api/notes/${_id}/pin`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    refresh();
  };


  return (
    <Card sx={{
      width: "300px", backgroundColor: color

    }}>
      <CardHeader

        action={
          <>
            <IconButton aria-label="pin" onClick={pinTask} color='warning'>
              <PushPinIcon fontSize="small" />
            </IconButton>
            <IconButton aria-label="settings" color='primary' onClick={() => setNoteForUpdate(note)} >
              <EditIcon fontSize='small' />
            </IconButton>
            <IconButton aria-label="delete" color='error' onClick={deleteNote}>
              <DeleteForeverIcon fontSize='small' />
            </IconButton>
          </>
        }
        title={title}

      />
      <CardContent>
        <Typography gutterBottom sx={{
          color: 'text.secondary', fontSize: 14, textAlign: "left", overflow: "hidden"
        }}>
          {content}
        </Typography>
        <Typography variant="body2" sx={{ textAlign: "left" }}>
          {formatDate(updatedAt)}
        </Typography>
        {user?.role === "admin" && note?.user && (
          <Typography variant="body2" sx={{ textAlign: "left" }}>
            Added by :
            <Tooltip title={note.user.email} arrow>
              <span style={{ cursor: "pointer", marginLeft: "5px" }}>
                {note.user.name}
              </span>
            </Tooltip>
          </Typography>
        )}
      </CardContent>

    </Card >
  );
}
