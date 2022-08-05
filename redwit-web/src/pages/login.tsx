import React from 'react'
import { Field, Form, Formik} from 'formik'
import { Box, Button, FormControl, FormErrorMessage, FormLabel, Input } from '@chakra-ui/react'
import { format } from 'path'
import { Wrapper } from '../components/Wrapper'
import { InputField } from '../components/InputField'
import { useMutation } from 'urql'
import { useLoginMutation, useRegisterMutation } from '../generated/graphql'
import { toErrorMap } from '../utils.toErrorMap'
import { useRouter } from 'next/router'




export const Login: React.FC<{}> = ({}) => {
    const router = useRouter();
    const [, login] = useLoginMutation();
        return (
        <Wrapper>
            <Formik initialValues={{ username:"", password: ""}}
             onSubmit ={ async ( values, {setErrors}) => {
                const response = await login({ options: values});
                if (response.data?.login.errors) {
                    setErrors(toErrorMap(response.data.login.errors))
                } else if (response.data?.login.user){
                    //worked
                    router.push("/");
                }
             }}
            >
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
                    <Button mt={4} type='submit' isLoading={isSubmitting} color="teal.500" >
                     login
                     </Button>
                 </Form>
                )}

            </Formik>
        </Wrapper>
        )
}


export default Login;