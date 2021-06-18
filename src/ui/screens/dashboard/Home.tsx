import React from 'react';
import {Animated, SafeAreaView, Text, View} from 'react-native';
import useHomeViewModel, {HomeViewModel} from '../../../domain/home/vm/HomeViewModel';
import StockButton from '../../components/buttons/StockButton';
import HomeStyles from '../../styles/screens/dashboard/Home';
import {ScreenProps, ScreenTheme, withPureScreen} from '../withScreen';

export type HomeProps = ScreenProps<HomeViewModel>;

const Home: React.FunctionComponent<HomeProps> = props => {
  const {viewModel} = props;
  return (
    <SafeAreaView style={HomeStyles.container}>
      <View style={HomeStyles.scoreCard}>
        <Text style={HomeStyles.scoreCardText}>
          <Text style={HomeStyles.scoreCardLabelText}>Score:{'  '}</Text>
          <Text>{viewModel.score}</Text>
        </Text>
        <Text style={HomeStyles.scoreCardText}>
          <Text style={HomeStyles.scoreCardLabelText}>Overs:{'  '}</Text>
          <Text>{viewModel.overs}</Text>
        </Text>
      </View>
      <View style={HomeStyles.pitch}>
        <Text style={HomeStyles.pitchText}>{viewModel.striker}</Text>
        <Text style={HomeStyles.pitchText}>{viewModel.runner}</Text>
      </View>
      <Animated.Text style={[HomeStyles.flashScoreText, {opacity: viewModel.flashScoreOpacity}]}>
        {viewModel.flashScore}
        <Text style={HomeStyles.flashScoreHintText}>
          {'\n'}
          {viewModel.flashScoreHint}
        </Text>
      </Animated.Text>
      <StockButton
        title={'Bowl'}
        theme={'light'}
        onPress={viewModel.onBowlPress}
        disabled={viewModel.inningEnded}
      />
    </SafeAreaView>
  );
};

export default withPureScreen<HomeProps, HomeViewModel>(Home, useHomeViewModel, {
  theme: ScreenTheme.DARK,
});
