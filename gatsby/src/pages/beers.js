import React from 'react';
import { graphql } from 'gatsby';
import styled from 'styled-components';

const BeerGridStyles = styled.div`
  display: grid;
  gap: 2rem;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  margin-top: 2rem;
`;

const SingleBeerStyles = styled.div`
  border: 1px solid var(--grey);
  padding: 2rem;
  text-align: center;
  img {
    width: 100%;
    height: 200px;
    object-fit: contain;
    display: grid;
    align-items: center;
    font-size: 10px;
  }
`;

export default function BeersPage({ data }) {
  const beers = data.beers.nodes;
  return (
    <>
      <h2 className="center">
        We have {beers.length} Beers Available. Dine in Only!
      </h2>
      <BeerGridStyles>
        {beers
          .filter((beer) => !!beer.name) // bug with sampleAPIs beers api
          .map((beer) => {
            const rating = Math.round(beer.rating.average);
            const ratingTwoDecimals =
              Math.round((beer.rating.average + Number.EPSILON) * 100) / 100;
            return (
              <SingleBeerStyles key={beer.id}>
                <img src={beer.image} alt={beer.name} />
                <h3>{beer.name}</h3>
                {beer.price}
                <p title={`${ratingTwoDecimals} out of 5 stars`}>
                  <span>{ratingTwoDecimals} / 5 &nbsp;</span>
                  {`⭐️`.repeat(rating)}
                  <span style={{ filter: `grayscale(100%)` }}>
                    {`⭐️`.repeat(5 - rating)}
                  </span>
                  <span> ({beer.rating.reviews})</span>
                </p>
              </SingleBeerStyles>
            );
          })}
      </BeerGridStyles>
    </>
  );
}

export const query = graphql`
  query {
    beers: allBeer {
      nodes {
        id
        name
        price
        rating {
          average
          reviews
        }
        image
      }
    }
  }
`;
