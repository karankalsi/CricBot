import React from 'react';
import {SafeAreaView, Text} from 'react-native';
import useMatchResultViewModel, {
  MatchResultViewModel,
} from '../../../domain/home/vm/MatchResultViewModel';
import {Inning} from '../../../domain/innings';
import StockButton from '../../components/buttons/StockButton';
import MatchResultStyles from '../../styles/screens/dashboard/MatchResult';
import {ScreenProps, ScreenTheme, withPureScreen} from '../withScreen';

export interface MatchResultProps extends ScreenProps<MatchResultViewModel> {
  inning: Inning;
}

const MatchResult: React.FunctionComponent<MatchResultProps> = props => {
  const {viewModel} = props;
  return (
    <SafeAreaView style={MatchResultStyles.container}>
      <Text style={MatchResultStyles.title}>{viewModel.title}</Text>
      <Text style={MatchResultStyles.message}>{viewModel.message}</Text>
      <StockButton theme={'light'} title={'Start Over'} onPress={viewModel.onStartOver} />
    </SafeAreaView>
  );
};

export default withPureScreen<MatchResultProps, MatchResultViewModel>(
  MatchResult,
  useMatchResultViewModel,
  {
    theme: ScreenTheme.DARK,
  },
);
