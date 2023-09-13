import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DropboxIntegration = () => {
  const [ isAuthenticated, setIsAuthenticated ] = useState(false);
  const [ accessToken, setAccessToken ] = useState(null);

  useEffect(() => {
    // Check if an access token is available in local storage
    const storedToken = localStorage.getItem('m4of4ek7lvyylpo');
    if (storedToken) {
      setAccessToken(storedToken);
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = () => {
    // Redirect the user to Dropbox for OAuth 2.0 authentication
    const t = "redirect_uri=http://localhost:3000/api/dropbox/redirect";
    window.location.href = `https://www.dropbox.com/oauth2/authorize?client_id=m4of4ek7lvyylpo&${t}&response_type=token&access_token_type=offline`;
  };

  const handleLogout = () => {
    // Clear the access token from state and local storage
    setAccessToken(null);
    localStorage.removeItem('dropboxAccessToken');
    setIsAuthenticated(false);
  };
  const uploader = () => {
    console.log(window.location.hash);
    const access_token = window.location.hash.split('&')[ 0 ].split('=')[ 1 ];
    const uploadUrl = 'https://content.dropboxapi.com/2/files/upload';
    // const header = {
    // Authorization: `Bearer ${access_token}`,
    // Dropbox-API-Arg: `{\"autorename\":false,\"mode\":\"add\",\"mute\":false,\"path\":\"/Homework/math/Matrices.txt\",\"strict_conflict\":false}`,
    // Content-Type: "application/octet-stream"
    // }
    axios.post("https://api.dropboxapi.com/2/users/get_current_account", {
      "Authorization": `Bearer jx48vq6or2uzg9e`
    }).
      then((res) => {
        console.log(res);
      }).catch(e => console.log(e));
    // const apiUrl = 'https://content.dropboxapi.com/2/files/upload';
    //   const headers = {
    //     'Authorization': `Bearer ${access_token}`,
    //     'Content-Type': 'application/octet-stream',
    //     'Dropbox-API-Arg': JSON.stringify({
    //       path: `/uploads/${file.name}`,
    //       mode: 'add',
    //       autorename: true,
    //       mute: false,
    //     }),
    //   };

    // axios({
    //   method: 'post',
    //   headers: {
    //     "Authorization": `Bearer ${access_token}`,
    //     "Dropbox-API-Arg": `{\"autorename\":false,\"mode\":\"add\",\"mute\":false,\"path\":\"/Homework/math/Matrices.txt\",\"strict_conflict\":false}`,
    //     "Content-Type": "application/octet-stream"
    //   },
    //   url: uploadUrl
    // }).then(res => {
    //   console.log(res);
    // })
  };

  return (
    <div>
      {!isAuthenticated ? (
        <div>
          <button onClick={handleLogin}>Connect to Dropbox</button>
          <button onClick={uploader}>Upload</button>
        </div>
      ) : (
        <div>
          <p>Connected to Dropbox!</p>
          <button onClick={handleLogout}>Disconnect</button>
        </div>
      )}
    </div>
  );
};

export default DropboxIntegration;