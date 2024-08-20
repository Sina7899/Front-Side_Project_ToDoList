function Card({
  CardTag,
  CardTitleTag,
  cardTitle,
  cardDescription,
  buttons,
  cardTagStyle,
  cardInfoDivStyle,
  cardTitleTagStyle,
  cardDescriptionStyle,
  cardButtonsDivStyle,
}) {
  return (
    <CardTag className={cardTagStyle}>
      <div className={cardInfoDivStyle}>
        <CardTitleTag className={cardTitleTagStyle}>{cardTitle}</CardTitleTag>
        <p className={cardDescriptionStyle}>{cardDescription}</p>
      </div>
      <div className={cardButtonsDivStyle}>{buttons}</div>
    </CardTag>
  );
}

export { Card };
