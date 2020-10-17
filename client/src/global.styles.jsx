import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
    body {
        font-family: 'Noto Sans';
        padding: 20px 40px;

        @media screen and (max-width: 800px) {
            // run the below CSS only when the rules in the brackets matched
            padding: 10px;
        }
    }

    /* making navi bar's items don't become purple and underscored. */
    a {
        text-decoration: none;
        color: black;
    }

    /* universial selector for all elements */
    * {
        box-sizing: border-box;
    }
`;
