import styled from 'styled-components';

export const MainContainer = styled.div`
    font-family: 'Roboto', sans-serif;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    min-height: 90vh;
    color: white;
`;

export const AdminMainContainer = styled(MainContainer)`
    width: 800px;
    flex-wrap: wrap;
    gap: 20px;
`;


export const ContentContainer = styled.div`
    margin-top: 50px;
    margin-right: 200px; 
    z-index: 0;
`;

export const StyledButtonContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    margin-left: 1000px;
`;

export const WelcomeMessage = styled.h1`
    color: rgba(255, 255, 255, 0.75);
    font-size: 32px;
    text-align: center;
`;

export const FlexContainer = styled.div`
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        text-align: center;
        height: 100vh;
    `;
export const ColumnContainer = styled(FlexContainer)`
        flex-direction: column;
    `;
export const RowContainer = styled(FlexContainer)`
        flex-direction: row;
    `;

export const LogoImage = styled.img`
        width: 500px;
        height: auto;
        margin-right: 200px;
    `;

export const CocktailsPageContainer = styled.div`
    display: flex;
    flex-direction: row;
    padding: 50px;
`;

export const CardsSection = styled.div`
    flex: 2;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    margin-top: 20px;
`;

export const CardTitle = styled.h2`
    color: white;
    font-size: 30px;
    margin-bottom: 115px;
`;
export const CloseCardTitle = styled(CardTitle)`
    margin: 40px 0 40px 0;
`;
export const MultipleCardsContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 20px;
    max-height: 50vh;
    overflow-y: auto;
`;

export const MultipleCardsContainerSmall = styled(MultipleCardsContainer)`
    gap: 10px;
    max-height: 200px;
    max-width: 800px;
`;

export const Input = styled.input`
    display: block;
    padding: 10px;
    font-size: 16px;
    width: 100%;
    max-width: 500px;
    margin: 0 auto 20px auto;
`;

export const SmallInput = styled(Input)`

    max-width: 25%;

`;




export const Button = styled.button`
    padding: 10px 60px;
    font-size: 16px;
    cursor: pointer;
    background-color: #295c59;
    color: #ffffff;
    border: none;
    border-radius: 5px;
    margin-bottom: 20px;

    &:hover {
        background-color: rgba(84, 84, 84, 0.25);
    }
`;
export const SmallButton = styled.button`
    padding: 5px 10px;
    cursor: pointer;
    background-color: #ff3b3b;
    border: none;
    border-radius: 5px;
    color: white;
    font-size: 14px;


    &:hover {
        background-color: rgba(84, 84, 84, 0.25);
    }
`;

export const ListContainer = styled.ul`
    list-style-type: none;
    padding: 0;
    text-align: center;
    max-height: 200px;
    overflow-y: auto;
    background-color: rgba(0,0,0,0.2);
`;

export const ListItem = styled.li`
    margin: 15px 5px 15px;
    width: 95%;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

export const ListElements = styled.span` 
    background-color: #295c59;
    color: white;
    padding: 5px 10px;
    border-radius: 5px;
    font-size: 14px;
    margin-left: 25px;
`;

export const NoEffect = styled.div``;