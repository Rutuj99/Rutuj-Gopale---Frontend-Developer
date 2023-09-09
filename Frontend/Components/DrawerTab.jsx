import React from 'react';
import '../Styling/Styles.css';
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,Button,Input
} from '@chakra-ui/react';
import { useDisclosure } from '@chakra-ui/react';

import { HamburgerIcon } from '@chakra-ui/icons'




export default function DrawerTab() {

    const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = React.useRef()

  return (
    <div>
      <HamburgerIcon w={10} h={10} ref={btnRef}  onClick={onOpen} style={{cursor:"pointer"}}/>
      <Drawer
        isOpen={isOpen}
        placement='right'
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent  style={{backgroundColor:"black",width:"250px"}}>
          <DrawerCloseButton  style={{color:"white"}} />
             

          <DrawerBody  >
          <div id="content3" >
          <p>FALCON 9</p>
          <p>FALCON HEAVY</p>
          <p>DROGAN</p>
          <p>STARSHIP</p>
          <p>HUMAN SPACEFLIGHTS</p>
          <p>RIDESHARE</p>
         
        </div>
          </DrawerBody>

          <DrawerFooter>
            <Button size='sm' width="100px" style={{backgroundColor:"white",color:"black",fontSize:"14px"}} >LOGIN</Button> &nbsp;
            <Button size='sm' width="100px" style={{backgroundColor:"white",color:"black",fontSize:"14px"}}>SIGN-UP</Button>
            
          </DrawerFooter>

        </DrawerContent>
      </Drawer>
    </div>
  )
}
