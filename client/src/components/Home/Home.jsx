
import ScrollButton from "./ScrollButton";
import React, { useEffect, useState } from "react";
import styles from "./Home.module.css";
import { Flex, Box, Image, Badge, Button, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

function HomePage() {
  const [getteacherdata, setteacherdata] = useState([]);
  const navigate = useNavigate();

  const getdata = async () => {
    const res = await fetch("https://edutechb.herokuapp.com", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();
    console.log(data);

    if (res.status === 422 || !data) {
      console.log("error ");
    } else {
      setteacherdata(data);
      console.log("Teacher Data");
    }
  };

  useEffect(() => {
    const type = JSON.parse(localStorage.getItem("designation")) || "";
    if (type == "teacher") navigate("/account");
    getdata();
  }, []);

  return (
    <>
      <Flex
      className={styles.flexBox}
        display={"flex"}
        flexWrap={"wrap"}
        rowGap={"40px"}
        width={"80%"}
        margin={"auto"}
      >
        {getteacherdata.map((data, index) => (
          <Flex
          className={styles.flexBox2}
            display={"flex"}
            margin={"auto"}
            borderWidth="1px"
            rounded="lg"
            boxShadow="rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px"
            w="45.5%"
            h="210px"
          >
            <Box maxW="sm" width={"50%"} height={"198px"} position="relative">
              <Image
                src={data.imageURL}
                rounded={"full"}
                width={"200px"}
                height={"200px"}
                objectFit={"cover"}
              />
            </Box>
            <Box width={"59%"}>
              <Flex
                justifyContent="space-between"
                align={"right"}
                alignContent="center"
                height={"195px"}
              >
                <Box
                  m={"20px"}
                  fontSize="22px"
                  fontWeight="semibold"
                  as="h4"
                  lineHeight="tight"
                >
                  {data.Name}
                  <Text fontSize="16px">{data.Expertise}</Text>
                  <Text color={"grey"} fontSize="12px">
                    {data.Experience}
                  </Text>
                  <Box d="flex" alignItems="baseline">
                    <Badge
                      borderRadius={"10px"}
                      px="2"
                      fontSize="18px"
                      colorScheme="teal"
                    >
                      {`₹${data.Charge}`}
                    </Badge>
                  </Box>

                  <Button
                  className={styles.view}
                    flex={1}
                    color="rgb(102,163,187)"
                    border={"2px solid rgb(102,163,187)"}
                    borderRadius={"10px"}
                    fontSize={"sm"}
                    m={"10px"}
                    marginLeft={"-10px"}
                    width={"120px"}
                    responsive="yes"
                    onClick={() => {
                      navigate(`/about/${data.ID}`);
                    }}
                  >
                    View
                  </Button>
                </Box>
              </Flex>
            </Box>
          </Flex>
        ))}
      </Flex>
      <ScrollButton />
    </>
  );
}

export default HomePage;
