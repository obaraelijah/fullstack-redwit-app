import  * as React from 'react'
import { Form, Formik } from 'formik'
import { Box, Button, } from '@chakra-ui/react';
import { format } from 'path';
import { Wrapper } from '../components/Wrapper';
import {InputField} from "../components/InputField" 
import { useMutation } from 'urql';

import { toErrorMap } from '../utilis/toErrorMap';
import { useRegisterMutation } from '../generated/graphql';
import { useRouter } from 'next/router';


interface registerProps {}




export const Login: React.FC<{}> = ({}) => { 
    const router =useRouter();
    const [, register] = useRegisterMutation();
        return (
        <Wrapper variant='small'>
         <Formik 
         initialValues={{username: "", password: ""}}
         onSubmit={async (values , {setErrors})=> {
            const response= await register(values);
           if (response.data?.register.errors) {
            setErrors(toErrorMap(response.data.register.errors));
           } else if (response.data?.register.user){
                //works
                router.push("/");
           }
          
         }}>
            {({isSubmitting}) => (
                <Form>
                   <InputField 
                    name='username'
                    placeholder='username'
                    label="Username"
                   />
                   <Box mt={4}>
                    <InputField 
                    name="password"
                    placeholder="password"
                    label="Password"
                    type="password"
                   />
                   </Box>
                   <Button type='submit' isLoading={isSubmitting} color="teal.500" >
                    register
                    </Button>
                </Form>
            )}
         </Formik>
         </Wrapper>
        );
}


export default Login;