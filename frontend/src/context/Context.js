import React from "react";

export const UserContext = React.createContext();
export const QuestionContext = React.createContext();
export const GeneratedUserContext = React.createContext();

export const ContextProvider = (props) => {
  const [user, setUser] = React.useState("");
  const [quiestion, setQuestion] = React.useState("");
  const [generatedUser, setGeneratedUser] = React.useState("");
  return (
    <UserContext.Provider value={[user, setUser]}>
      <QuestionContext.Provider value={[quiestion, setQuestion]}>
        <GeneratedUserContext.Provider value={[generatedUser, setGeneratedUser]}>
          {props.children}
        </GeneratedUserContext.Provider>
      </QuestionContext.Provider>
    </UserContext.Provider>

  );
};
