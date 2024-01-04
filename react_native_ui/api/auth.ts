export const loginUser = async (email: string, password: string) => {
  // const result = await axios.post(`${API_URL}/auth/login`, {
  //     email,
  //     password,
  //   }

  if (email != 'coffee-algo-admin@gmail.com' || password != 'password') {
    return null;
  }

  return {
    data: {
      statusCode: 200,
      user: {
        _id: '65632bea30f24581642b7008',
        email: 'coffee-algo-admin@gmail.com',
        access_token:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiY29mZmVlLWFsZ28tYWRtaW5AZ21haWwuY29tIiwic3ViIjoiNjU2MzJiZWEzMGYyNDU4MTY0MmI3MDA4IiwiaWF0IjoxNzAzMDI0MTU1LCJleHAiOjE3MDMwMjc3NTV9.8VowgoWOX0L0IRkHxuCc6ULvqKnAkKxRuy2SfhCEenQ',
      },
    },
  };
};
