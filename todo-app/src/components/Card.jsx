function Card({
  cardStatus,
  cardKey,
  CardTag,
  CardTitleTag,
  cardTitle,
  cardDescription,
  buttons,
  cardOnClick,
  cardTagStyle,
  cardInfoDivStyle,
  cardTitleTagStyle,
  cardDescriptionStyle,
  cardButtonsDivStyle,
}) {
  return (
    <CardTag
      key={cardKey}
      onClick={() =>
        cardOnClick(cardTitle, cardDescription, cardKey, cardStatus)
      }
      className={cardTagStyle}
    >
      <div className={cardInfoDivStyle}>
        <CardTitleTag className={cardTitleTagStyle}>{cardTitle}</CardTitleTag>
        <p className={cardDescriptionStyle}>{cardDescription}</p>
      </div>
      <div className={cardButtonsDivStyle}>{buttons}</div>
    </CardTag>
  );
}

export { Card };
