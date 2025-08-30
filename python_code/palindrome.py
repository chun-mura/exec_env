def is_palindrome(str: str):
  str_length = len(str)
  str_length_half = int(str_length / 2)

  print(f'文字数: {int(str_length)}')

  # エッジケース：文字列がNoneの場合

  # エッジケース：文字数が0の場合

  # エッジケース：型がstring以外の場合

  for i in range(str_length_half):
    print(f'{i+1}文字目: {str[i]}')
    print(f'{str_length - (i)}文字目: {str[str_length - (i + 1)]}')

    # Falseを返す条件：文字数/2までの比較完了前にFalseになったら
    if str[i] != str[str_length - (i + 1)]:
      return False

  return True

print(is_palindrome("たけやぶやけた"))
print(is_palindrome("たけやぶあああ"))
