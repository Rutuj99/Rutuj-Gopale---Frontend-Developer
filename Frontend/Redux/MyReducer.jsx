import React from 'react'

let initialState={
     data:[]
}

export default function MyReducer(state=initialState,action) {
   
    if(action.type="space"){
         return{
               ...state,data:action.payload
         }
    }

    return state;

}
