/** @type {import('@types/jscodeshift').Transform} */
const codemod = (fileInfo, { jscodeshift: j }) => {
  const root = j(fileInfo.source)

  const lodashImports = root
    .find(j.ImportDeclaration)
    .filter((nodePath) => nodePath.value.source.value.startsWith('lodash'))

  let replacementSpecifiers = []
  /** @type {import('@types/jscodeshift').ASTNode} */
  let first = null

  lodashImports.forEach((nodePath) => {
    // "lodash/mapValues" -> "mapValues"
    const id = nodePath.value.source.value.replace('lodash/', '')
    const [specifier] = nodePath.value.specifiers
    const name = specifier ? specifier.local.name : id

    const replacementSpecifier = j.importSpecifier(
      j.identifier(id),
      j.identifier(name),
    )
    replacementSpecifiers.push(replacementSpecifier)

    if (!first) {
      first = nodePath
    } else {
      j(nodePath).remove()
    }
  })

  if (first) {
    first.value.specifiers = replacementSpecifiers
    first.value.source.value = 'lodash-es'
  }

  console.log('->', first.value.source.loc.lines, '<-')

  return root.toSource()
}
export default codemod
