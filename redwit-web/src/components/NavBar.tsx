import { Box, Button, Flex } from '@chakra-ui/react';
import Link from 'next/link';
import React from 'react'
import { useMeQuery } from '../generated/graphql';



interface NavBarProps {}

export const NavBar: React.FC<NavBarProps> = ({}) => {
    const [{ data, fetching}] = useMeQuery();
    let body = null

//loading data
    if (fetching){
  body = null
        //user not logged in
    } else if (!data?.me) {
  body = (
    <>
    <Link  href={"/login"} >login</Link><span>  </span>
    <Link href={'/register'} >register</Link>
    </>
  )
        //user logged in
    } else {
   body = (
   <Flex>
       <Box>{data.me.username}</Box>
       <Button variant={'link'}>logout</Button>
   </Flex> 
   )
    }
   
        return (
            <Flex bg='tan' p={4} >
                <Box ml={'auto'}>
                  {body}
                </Box>
            </Flex>
        );
}