import { AlertColor, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Popover, Typography } from "@mui/material";
import FacebookIcon from '@mui/icons-material/Facebook';
import PinterestIcon from '@mui/icons-material/Pinterest';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import ContentPasteIcon from '@mui/icons-material/ContentPaste';
import {
  FacebookShareButton,
  PinterestShareButton,
  WhatsappShareButton,
} from "react-share";
import { useEffect, useState } from "react";
import CustomAlert from "../Alert/CustomAlert";


interface SharePopOverProps {
  link: string;
  img: string;
  status: boolean;
  anchor: HTMLButtonElement | null;
  onclose: () => void;
}

const SharePopOver: React.FC<SharePopOverProps> = ({ link, img, status, anchor, onclose }) => {
  const [urlLink, setUrlLink] = useState<string>(link);
  const [urlImage, setUrlImage] = useState<string>(img);
  const [message, setMessage] = useState("");
  const [messageOpen, setMessageOpen] = useState(false);
  const [messageSeverity, setMessageSeverity] = useState<AlertColor>("success");

  const handleCopyClick = () =>{
    navigator.clipboard.writeText(urlLink);
    setMessage("Link has been copied to clipboard");
    setMessageOpen(true);
    setMessageSeverity("success");

  }
  useEffect(() => {
    setUrlLink(link);
    setUrlImage(img)
  }, [link]);
  return(
    <>
      <Popover
          id={'simple-popover'}
          open={status}
          anchorEl={anchor}
          onClose={onclose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
        >
          <List>
            <ListItem disablePadding>
              <ListItemButton>
                <FacebookShareButton url={urlLink} style={{display: "flex", alignItems:"center"}}>
                  <ListItemIcon>
                    <FacebookIcon />
                  </ListItemIcon>
                  Facebook
                </FacebookShareButton>
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
            <ListItemButton>
                <PinterestShareButton media={urlImage} url={urlLink} style={{display: "flex", alignItems:"center"}}>
                  <ListItemIcon>
                    <PinterestIcon />
                  </ListItemIcon>
                  Pinterest
                </PinterestShareButton>
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton>
                <WhatsappShareButton url={urlLink} style={{display: "flex", alignItems:"center"}}>
                  <ListItemIcon>
                    <WhatsAppIcon />
                  </ListItemIcon>
                  Whatsapp
                </WhatsappShareButton>
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton onClick={handleCopyClick}>
                <ListItemIcon>
                  <ContentPasteIcon />
                </ListItemIcon>
                <ListItemText primary="Copy Link" />
              </ListItemButton>
            </ListItem>
          </List>
        </Popover>
        <CustomAlert message={message} messageSeverity={messageSeverity} status={messageOpen} onClose={()=>setMessageOpen(false)}/>
      </>
  );
};
export default SharePopOver;