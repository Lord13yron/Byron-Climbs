import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
:root{
   
    
    
    --color-nature-0: #D8F3DC;
    --color-nature-50: #B7E4C7;
    --color-nature-100: #95D5B2;
    --color-nature-200: #74C69D;
    --color-nature-300: #52B788;
    --color-nature-400: #40916C;
    --color-nature-500: #2D6A4F;
    --color-nature-600: #1B4332;
    --color-nature-700: #081C15;

    --border-radius-tiny: 3px;
    --border-radius-sm: 5px;
    --border-radius-md: 7px; 
    --border-radius-lg: 9px; 

    --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.4);
    --shadow-md: 0px 0.6rem 2.4rem rgba(0, 0, 0, 0.3);
    --shadow-lg: 0 2.4rem 3.2rem rgba(0, 0, 0, 0.4);
  
}
*{
    box-sizing: border-box;
    padding: 0;
    margin: 0;
}

button {
  cursor: pointer;
}

button:hover{
    opacity:75%;
}

button:disabled {
    cursor: not-allowed;
    opacity: 100%;
}

a{
    text-decoration: none;
    color: inherit;
}
`;

export default GlobalStyles;
