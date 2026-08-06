import React from 'react'

export const HeadingBlock = ({ headingText, level }: any) => {
  const Tag = level || 'h2'
  return <Tag className="text-4xl font-bold mt-4">{headingText}</Tag>
}
