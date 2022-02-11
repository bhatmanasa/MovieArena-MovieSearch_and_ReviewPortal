import React from 'react';
import { TextField,Grid, InputAdornment,IconButton } from '@material-ui/core';
const Input = ({name,handleChange,label,fullWidth,autoFocus,type,handleShowPassword})=>{
    return (
        <Grid item xs={12} sm={12}>
            <TextField 
                name={name}
                onChange={handleChange}
                variant="outlined"
                fullWidth
                label={label}
                autoFocus={autoFocus}
                type={type}
    
            />
        </Grid>
    )
}

export default Input